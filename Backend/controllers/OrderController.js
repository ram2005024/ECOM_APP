import { prisma } from "../config/db.config.js";
import { inngest } from "../inngest/client.js";
//Controller to get the orders of the user from the database
export const getOrders = async (req, res) => {
  const userId = req.user.id;
  //Get all the orders of the user from DB
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                reviews: true,
              },
            },
          },
        },
      },
    });
    if (!orders)
      return res
        .status(400)
        .json({ message: "Order doesn't exists", success: false });
    //If order exists send to the frontend
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, success: false });
  }
};
export const changeStatus = async (req, res) => {
  const { itemId, orderStatus, userId } = req.body;
  try {
    console.log("order status is : ", orderStatus);
    //Find the orderItem and change the order status
    const item = await prisma.orderItem.update({
      where: {
        id: itemId,
      },
      data: { orderStatus },
      include: {
        product: {
          include: {
            seller: true,
          },
        },
      },
    });
    //When the status is changed send the message to the customer
    await inngest.send({
      name: "status.send",
      data: {
        userId,
        seller: item.product.seller,
        product: item.product,
        status: orderStatus,
      },
    });
    return res.json({ success: true, message: "Status changed" });
  } catch (error) {
    console.log(error.message);
    return res.json({ message: error.message, success: false });
  }
};
