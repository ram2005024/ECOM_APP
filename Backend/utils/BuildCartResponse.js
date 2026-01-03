import { prisma } from "../config/db.config.js";

export const BuildCartResponse = async (cartID) => {
  const cartItems = await prisma.cartItem.findMany({
    where: {
      cartId: cartID,
    },
    include: {
      product: {
        include: {
          seller: true,
          category: true,
        },
      },
    },
  });
  let totalPrice = 0;
  let totalItem = 0;
  const items = cartItems.map((i) => {
    totalItem += i.quantity;

    totalPrice += i.quantity * i.totalPrice;
    return {
      cartItemId: i.id,
      productId: i.productId,
      quantity: i.quantity,
      name: i.product.name,
      price: i.totalPrice,
      description: i.product.description,
      image: i.product.image,
      seller: i.product.seller,
      subTotal: i.quantity * i.totalPrice,
      category: i.product.category,
    };
  });
  return {
    cartId: cartID,
    items,
    totalItem,
    totalPrice,
  };
};
