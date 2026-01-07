//Helper to check if the cart of the user not less than the coupen maxCartValue
export const isValidCartValue = async (items, coupen) => {
  //Find the quantity of the user for his/her cart items
  console.log(items);
  const totalItem = items.reduce((a, i) => a + i.quantity, 0);
  console.log(totalItem);
  if (Number(totalItem >= Number(coupen.maxCartValue))) return true;
  else {
    return false;
  }
};
//Helper to check the discount ---------
export const calculateDiscount = async (items, coupen) => {
  var discountedValue;
  const total = items.reduce((a, i) => a + i.subTotal, 0);
  console.log(coupen);
  console.log(total);
  const discountValue = coupen.discountValue;
  const maxDiscount = coupen.maxDiscount;
  if (coupen.discountType === "percentage") {
    discountedValue = (total * discountValue) / 100;
    if (discountedValue > maxDiscount) {
      discountedValue = maxDiscount;
    }
  } else {
    discountedValue = discountValue;
  }

  return {
    discountedValue,
    grandTotal: Math.max(total - discountedValue, 0),
    coupenDescription: coupen.description,
    name: coupen.code,
  };
};
//Helper to find total for cart items
export const totalCartAmount = async (items) => {
  const totalAmount = items.reduce((a, i) => a + i.quantity * i.totalPrice, 0);
  return totalAmount;
};
