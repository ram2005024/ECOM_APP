import imagekit from "../config/imageKit.js";
import { prisma } from "../config/db.config.js";
import { inngest } from "../inngest/index.js";
import { openai } from "../config/geminiAI.js";
export const registerSellerData = async (req, res) => {
  const file = req.file;
  try {
    let imageURL;

    //Storing image url into the cloud i.e. imagekit database
    if (file) {
      const urlInResponse = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: "/sellers_profile",
      });
      imageURL = urlInResponse.url;
    }
    const seller = await prisma.seller.create({
      data: {
        userID: Number(req.body.userID),
        description: req.body.des,
        phoneNo: req.body.phone,
        address: req.body.address,
        isApproved: "pending",
        image: imageURL,
        filled: true,
        storename: req.body.name,
        type: req.body.type,
      },
      include: {
        user: true,
      },
    });
    await inngest.send({
      name: "seller/registration.submitted",
      data: {
        storename: seller.storename,
        username: seller.user.name,
        email: seller.user.email,
        storeID: seller.id,
        registerDate: seller.createdAt.toLocaleDateString(),
      },
    });
    return res.json({
      message: "Store application sent",
      success: true,
      seller: seller,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};
export const getSeller = async (req, res) => {
  try {
    const seller = await prisma.seller.findUnique({
      where: {
        userID: req.body.userID,
      },
      include: {
        user: true,
      },
    });
    return res.json({ success: true, seller });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
//----------Reapply seller----------------------
export const reapplySeller = async (req, res) => {
  const file = req.file;
  try {
    let imageURL;
    console.log(typeof req.body.sellerId);
    //Storing image url into the cloud i.e. imagekit database
    if (file) {
      const urlInResponse = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: "/sellers_profile",
      });
      imageURL = urlInResponse.url;
    }
    const seller = await prisma.seller.update({
      where: { id: Number(req.body.sellerId) },
      data: {
        userID: Number(req.body.userID),
        description: req.body.des,
        phoneNo: req.body.phone,
        address: req.body.address,
        isApproved: "pending",
        image: imageURL,
        filled: true,
        storename: req.body.name,
        type: req.body.type,
      },
      include: {
        user: true,
      },
    });
    await inngest.send({
      name: "seller/registration.submitted",
      data: {
        type: "resend",
        storename: seller.storename,
        username: seller.user.name,
        email: seller.user.email,
        storeID: seller.id,
        registerDate: seller.createdAt.toLocaleDateString(),
      },
    });
    return res.json({
      message: "Store application re-sent",
      success: true,
      seller: seller,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};
//---------Controller to get the seller orders if received-----
export const getSellerOrder = async (req, res) => {
  const sellerId = req.user.id;
  try {
    //Get seller id of the user
    const seller = await prisma.seller.findFirst({
      where: {
        userID: req.user.id,
      },
    });
    const sellerId = seller.id;
    //Get the order with seller info
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: {
              include: {
                seller: true,
              },
            },
          },
        },
      },
    });
    const selectedOrder = orders.filter((i) =>
      i.items.some((item) => item.product.sellerId == sellerId)
    );
    console.log("Selected order is ", selectedOrder);
    const sellerOrders = orders.flatMap((i) => {
      return i.items.filter((i) => i.product.sellerId == sellerId);
    });
    return res.json({
      success: true,
      orderItems: sellerOrders,
      order: selectedOrder,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
