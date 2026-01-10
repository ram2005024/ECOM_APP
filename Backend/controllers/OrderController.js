import { prisma } from "../config/db.config.js";
import { inngest } from "../inngest/client.js";
import { totalCartAmount } from "../libs/coupenHelper.js";
import { BuildOrderResponse } from "../utils/BuildOrderResponse.js";
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
        user: true,
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
  //If the order status is delivered then change the order payment status to paid
  if (orderStatus === "DELIVERED") {
    await prisma.order.updateMany({
      where: {
        userId: Number(userId),
      },
      data: {
        paymentStatus: "paid",
      },
    });
  }
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
//Controller to get all the orders--------------
export const getAllOrdersAnDate = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      select: {
        createdAt: true,
      },
    });

    if (!orders)
      return res
        .status(400)
        .json({ message: "Order doesn't exists", success: false });
    const formatted = orders.reduce((acc, date) => {
      const format = new Date(date.createdAt).toLocaleDateString(
        "en-CA", // YYYY-MM-DD format
        { timeZone: "Asia/Kathmandu" }
      );
      console.log(format);
      acc[format] = (acc[format] || 0) + 1;
      return acc;
    }, {});
    const final = Object.entries(formatted).map(([date, orders]) => ({
      date,
      orders,
    }));

    return res.status(200).json({ success: true, value: final });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, success: false });
  }
};
//----Controller to create order when it user pays through COD method
export const createOrderOnCOD = async (req, res) => {
  const { coupen, item, selectedAddress } = req.body;

  try {
    const cart = await prisma.cart.findFirst({
      where: {
        userId: Number(req.user.id),
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
    const total = await totalCartAmount(cartItems);
    const orderItems = await BuildOrderResponse(cartItems, selectedAddress);
    const order = await prisma.order.create({
      data: {
        totalAmount: coupen
          ? Math.round(Number(coupen.grandTotal))
          : Math.round(Number(total)),
        discountAmount: coupen ? Math.round(Number(coupen.discountedValue)) : 0,

        paymentMethod: "cod",
        paymentStatus: "pending",
        address: selectedAddress,
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
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, success: false });
  }
};
