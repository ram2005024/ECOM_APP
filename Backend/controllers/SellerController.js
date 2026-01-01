import imagekit from "../config/imageKit.js";
import { prisma } from "../config/db.config.js";
import { inngest } from "../inngest/index.js";
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
export const addProduct = async (req, res) => {
  const files = req.files;
  try {
    const images = [];
    if (files) {
      for (const file of files) {
        const res = await imagekit.upload({
          file: file.buffer,
          fileName: file.originalname,
          folder: "/product_image",
          extensions: [
            {
              name: "remove-bg",
              options: {
                add_shadow: true,
                bg_color: "ffffff",
              },
            },
          ],
        });
        images.push(res.url);
      }
    }
    const product = await prisma.product.create({
      data: {
        sellerId: Number(req.body.sellerId),
        name: req.body.productName,
        image: images,
        price: Number(req.body.actualPrice),
        offerPrice: Number(req.body.offerPrice),
        categoryId: Number(req.body.categoryId),
      },
    });
    console.log(product);
    return res.json({ message: "Added product", succes: true });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, success: false });
  }
};
