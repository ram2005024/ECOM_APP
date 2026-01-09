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
        user: true,
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
//Controller to get seller by sellerid
export const getSellerById = async (req, res) => {
  const sellerId = req.query.sellerId;
  try {
    const seller = await prisma.seller.findUnique({
      where: {
        id: Number(sellerId),
      },
      include: {
        user: true,
      },
    });
    if (!seller)
      return res.json({ message: "Seller doesn't exist", success: false });
    return res.json({ success: true, seller });
  } catch (error) {
    console.log(error);
  }
};
//Controller to return all important details aboout seller------
export const sellerAllDetails = async (req, res) => {
  try {
    const sellerId = req.user.id;
    console.log(sellerId);
    //Get all order items of seller-------
    const orderItems = await prisma.orderItem.findMany({
      include: {
        product: {
          include: {
            reviews: {
              include: {
                user: true,
              },
            },
            seller: true,
          },
        },
      },
    });
    //Get all the produts of seller id-----
    const products = await prisma.product.findMany({
      include: {
        seller: true,
        category: true,
      },
    });
    const sellerOrders = orderItems.filter(
      (i) => i.product.seller.userID === sellerId
    );
    const sellerRatings = [...sellerOrders.flatMap((i) => i.product.reviews)];
    const totalOrders = sellerOrders.length;
    const totalEarning = sellerOrders.reduce(
      (a, i) => a + i.quantity * i.price,
      0
    );
    const totalRating = sellerRatings.length;
    const totalProduct = products.filter(
      (i) => i.seller.userID == sellerId
    ).length;
    const sellerProducts = products.filter((i) => i.seller.userID == sellerId);
    return res.json({
      success: true,
      totalOrders,
      totalEarning,
      totalProduct,
      totalRating,
      ratings: sellerRatings,
      sellerProducts,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, success: false });
  }
};
//Controller to get all the seller
export const getAllSellers = async (req, res) => {
  try {
    const sellers = await prisma.seller.findMany({
      include: {
        user: true,
      },
    });
    if (!sellers)
      return res.json({ message: "No stores found", success: false });
    return res.json({ sellers, success: true });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, success: false });
  }
};
//Controller to set and unset the status of seller------
export const setStatus = async (req, res) => {
  try {
    const { value, storeId } = req.body;
    //Update the store
    console.log(value);
    await prisma.seller.update({
      where: {
        id: Number(storeId),
      },
      data: {
        isActive: value,
      },
    });

    return res.json({ message: "Status changed", success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};
