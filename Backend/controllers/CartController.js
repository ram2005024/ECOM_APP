import { prisma } from "../config/db.config.js";
import stripe from "../config/stripe.js";
import { inngest } from "../inngest/client.js";
import {
  calculateDiscount,
  isValidCartValue,
  totalCartAmount,
} from "../libs/coupenHelper.js";
import { BuildCartResponse } from "../utils/BuildCartResponse.js";
import { BuildOrderResponse } from "../utils/BuildOrderResponse.js";
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
//--------------Controller to verify the coupen-----------
export const verifyCoupen = async (req, res) => {
  const userID = req.user.id;
  const { items, coupenCode } = req.body;
  if (!coupenCode)
    return res
      .status(400)
      .json({ message: "Enter the coupen", success: false });
  try {
    //Verify coupen is for which category----------
    const coupen = await prisma.coupens.findFirst({
      where: {
        code: coupenCode.toUpperCase(),
      },
    });
    if (!coupen)
      return res
        .status(400)
        .json({ success: false, message: "Invalid coupen" });
    //if the coupen is valid or not
    if (!coupen.isActive)
      return res.json({ message: "Coupen is expired", success: false });
    // if the coupen is valid proceed further----------
    const user = await prisma.user.findUnique({
      where: {
        id: userID,
      },
    });

    //--------Verify for category of coupen for the given user-----
    if (coupen.forNewUser) {
      //Verify if the user is new or not ----
      const isUserNew =
        new Date(user.createdAt).getTime() >=
        Date.now() - 7 * 24 * 60 * 60 * 1000;

      if (!isUserNew) {
        return res.json({
          success: false,
          message: "Coupen is valid for new user",
        });
      }
      //Now check if the cart value of the user is less or more than the maxCartValue of the given coupen
      if (!(await isValidCartValue(items, coupen)))
        return res.json({
          success: false,
          message: `Cart value must be at least ${coupen.maxCartValue}`,
        });
      //If the user is new and coupen is valid apply the caluculation
      const coupenDetail = await calculateDiscount(items, coupen);
      return res.json({ success: true, coupenDetail });
    } else if (coupen.forPlus) {
      //Verify if the user is member or not----
      const isPlus = user.plusMember === coupen.forPlus;

      if (!isPlus) {
        return res.json({
          success: false,
          message: "Coupen is valid for members",
        });
      }
      //Now check if the cart value of the user is less or more than the maxCartValue of the given coupen
      if (!isValidCartValue)
        return res.status(400).json({
          success: false,
          message: `Cart value is less than ${coupen.maxCartValue}`,
        });
      //If the user is new and coupen is valid apply the caluculation
      const coupenDetail = await calculateDiscount(items, coupen);
      return res.json({ success: true, coupenDetail });
    } else {
      // check if the cart value of the user is less or more than the maxCartValue of the given coupen
      if (!isValidCartValue)
        return res.json({
          success: false,
          message: `Cart value is less than ${coupen.maxCartValue}`,
        });
      //If the user is new and coupen is valid apply the caluculation
      const coupenDetail = await calculateDiscount(items, coupen);
      return res.json({ success: true, coupenDetail });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, success: false });
  }
};
//----------Creating a stripe session------------------
export const stripeSession = async (req, res) => {
  const { items, selectedAddress, coupenDetail } = req.body;
  const userID = req.user.id;
  let line_items;
  if (!coupenDetail) {
    line_items = items.map((i) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: i.name,
        },
        unit_amount: Math.round(Number(i.price) * 100),
      },
      quantity: i.quantity,
    }));
  } else {
    line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Final Order",
          },
          unit_amount: Number(coupenDetail.grandTotal) * 100,
        },
        quantity: 1,
      },
    ];
    0;
  }
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,

      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}&type=cart`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,

      metadata: {
        userId: userID,
        address: JSON.stringify(selectedAddress),
        coupenDetail: JSON.stringify(coupenDetail) || "",
      },
    });
    res.json({ success: true, url: session.url });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error creating stripe session" });
  }
};
//-----------Verifying the payment using session id--------
export const verifyPayment = async (req, res) => {
  const { sessionID } = req.body;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionID, {
      expand: ["line_items"],
    });
    //Check the payment status ------
    if (session.payment_status !== "paid") {
      return res
        .status(400)
        .json({ message: "Please pay first", success: false });
    } else {
      //--------------If user has paid then create an order -----------
      const cart = await prisma.cart.findFirst({
        where: {
          userId: Number(session.metadata.userId),
        },
      });
      const cartItems = await prisma.cartItem.findMany({
        where: {
          cartId: cart.id,
        },
        include: {
          product: true,
        },
      });
      //Check if the order exists or not----
      const existingOrder = await prisma.order.findUnique({
        where: {
          sessionId: sessionID,
        },
      });
      if (existingOrder)
        return res.json({ success: false, message: "Order already exists." });
      //Making response for orderItems
      const orderItems = await BuildOrderResponse(
        cartItems,
        JSON.parse(session.metadata.address)
      );
      //Creating order and order items for user
      const coupen = JSON.parse(session.metadata.coupenDetail);
      const total = await totalCartAmount(cartItems);
      console.log("total is", total);
      const order = await prisma.order.create({
        data: {
          totalAmount: coupen
            ? Math.round(Number(coupen.grandTotal))
            : Math.round(Number(total)),
          discountAmount: coupen
            ? Math.round(Number(coupen.discountedValue))
            : 0,
          sessionId: sessionID,
          paymentMethod: "stripe",
          paymentStatus: session.payment_status,
          address: JSON.parse(session.metadata.address),
          user: {
            connect: {
              id: Number(req.user.id),
            },
          },
          items: {
            create: orderItems.map((item) => ({
              productId: item.productId,
              name: item.productName,
              coupen: coupen ? coupen.name : "",
              price: item.price,
              quantity: item.quantity,
              image: item.image,
            })),
          },
        },
        include: {
          items: true,
          user: true,
        },
      });
      //When the order is created clear the cart and send the seller message about order purchased by some user
      const items = await prisma.order.findUnique({
        where: {
          id: order.id,
        },
        include: {
          items: {
            include: {
              product: {
                include: {
                  seller: {
                    include: {
                      user: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      const sellers = [
        ...new Map(
          items.items.map((i) => [i.product.seller.id, i.product.seller])
        ).values(),
      ];

      await inngest.send({
        name: "payment/successful.order",
        data: {
          user: order.user,
          sellers,
        },
      });
      //Deleting user cart after order

      await prisma.cart.delete({
        where: {
          userId: req.user.id,
        },
      });
      //After all returning success
      return res.json({ success: true });
    }
  } catch (error) {
    console.log(error.message);
    return res.json({ message: error.message, success: false });
  }
};
