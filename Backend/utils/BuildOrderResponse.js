export const BuildOrderResponse = async (cartItems, address, coupen) => {
  return cartItems.map((i) => ({
    productName: i.product.name,
    price: i.totalPrice,
    quantity: i.quantity,
    productId: i.productId,
    totalPrice: i.totalPrice * i.quantity,
    address: address,
    image: i.product.image,
  }));
};
