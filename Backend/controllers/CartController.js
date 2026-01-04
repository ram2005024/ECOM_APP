import { prisma } from "../config/db.config.js";
import { BuildCartResponse } from "../utils/BuildCartResponse.js";
//Controller to add cart
export const addCart = async (req, res) => {
  const userId = req.user.id;
  const { pid } = req.body;
  try {
    //Check if the user with cart exists or not
    let cart = await prisma.cart.findFirst({
      where: {
        userId: userId,
      },
    });
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: userId,
        },
      });
    }
    //Checking if product is inside the cart item
    let cartItem = await prisma.cartItem.findFirst({
      where: {
        productId: pid,
        cartId: cart.id,
      },
    });
    let product = await prisma.product.findFirst({
      where: {
        id: pid,
      },
    });
    if (!product)
      return res.json({ message: "Product missing", success: false });
    if (!cartItem) {
      cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: pid,
          quantity: 1,
          totalPrice: product.price - product.offerPrice,
        },
      });
    }
    //Build response and send it to the frontend for globle state variable
    const response = await BuildCartResponse(cart.id);
    return res.json({ success: true, response });
  } catch (error) {
    console.log(error.message);
    return res.json({ message: error.message, success: false });
  }
};
//Controller to handle when cart is increased
export const handleIncreaseCart = async (req, res) => {
  const { cartItemId } = req.body;
  try {
    let cartItem = await prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
      },
    });
    if (!cartItem)
      return res.json({ message: "No cart item founded", success: false });
    cartItem = await prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        quantity: cartItem.quantity + 1,
      },
    });
    const response = await BuildCartResponse(cartItem.cartId);
    return res.json({ success: true, response });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, success: false });
  }
};
//Controller to handle when cart is decreased
export const handleDecreaseCart = async (req, res) => {
  const { cartItemId } = req.body;
  try {
    let cartItem = await prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
      },
      include: {
        cart: true,
      },
    });
    if (!cartItem)
      return res.json({ message: "No cart item founded", success: false });
    if (cartItem.cart.userId != req.user.id)
      return res.json({ message: "Unauthorized", success: false });
    if (cartItem.quantity === 1) {
      await prisma.cartItem.delete({
        where: {
          id: cartItemId,
        },
      });
    } else {
      cartItem = await prisma.cartItem.update({
        where: {
          id: cartItem.id,
        },
        data: {
          quantity: cartItem.quantity - 1,
        },
      });
    }
    const response = await BuildCartResponse(cartItem.cartId);
    return res.json({ success: true, response });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, success: false });
  }
};
//Controller to get cart details of any user...
export const getCartDetail = async (req, res) => {
  const userId = req.user.id;
  try {
    //Check whether use has a cart or not
    let cart = await prisma.cart.findFirst({
      where: {
        userId: userId,
      },
    });
    //if not exists then
    if (!cart)
      return res.json({
        message: "Cart hasnot been added yet to cart",
        success: false,
      });

    const response = await BuildCartResponse(cart.id);
    return res.json({ success: true, response });
  } catch (error) {
    console.log(error);
  }
};
//Controller to delete the cart item
export const handleCartItemDelete = async (req, res) => {
  const { cartItemId } = req.body;
  //Find if the cart exists or not
  let cartItem = await prisma.cartItem.findFirst({
    where: {
      id: cartItemId,
    },
  });
  if (!cartItem)
    return res.json({ message: "Cart item doesn't exist", success: false });
  //If exists delete
  await prisma.cartItem.delete({
    where: {
      id: cartItemId,
    },
  });
  //Send the remaining cart items in respective cart id and send it as response
  const response = await BuildCartResponse(cartItem.cartId);
  return res.json({
    message: "Deleted item from cart",
    success: true,
    response,
  });
};
