import { prisma } from "../config/db.config.js";
import { sendContactMessage } from "../config/sendEmail.js";
import { inngest } from "../inngest/index.js";
//-----------Getting stores to check approval--------------------
export const getStore = async (req, res) => {
  try {
    const store = await prisma.seller.findMany({
      where: {
        isApproved: "pending",
      },
      include: {
        user: true,
      },
    });

    return res.json({ success: true, store });
  } catch (error) {
    console.log(error.message);
    return res.json({ message: error.message, success: false });
  }
};
//---------------For accepting the store approval request-----------------
export const approveStatus = async (req, res) => {
  try {
    const storeID = req.body.storeid;
    const adminName = req.user.name;
    const store = await prisma.seller.update({
      where: {
        id: storeID,
      },
      data: {
        isApproved: "approved",
        approvedAt: new Date(),
        approvedBy: adminName,
      },
      include: {
        user: true,
      },
    });
    await inngest.send({
      name: "admin/store.approve",
      data: {
        status: "approved",
        to: store.user.email,
        username: store.user.name,
        id: store.id,
        storename: store.storename,
        approvedAt: store.approvedAt.toLocaleDateString(),
        registerDate: store.createdAt.toLocaleDateString(),
      },
    });
    return res.json({ message: "Store approved", success: true });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, success: false });
  }
};
//-------------for rejecting approval request----------
export const rejectStatus = async (req, res) => {
  try {
    const { storeID, rejectDes } = req.body;
    const adminName = req.user.name;
    const store = await prisma.seller.update({
      where: {
        id: storeID,
      },
      data: {
        isApproved: "rejected",
        reasonForRejection: rejectDes,
      },
      include: {
        user: true,
      },
    });
    await inngest.send({
      name: "admin/store.approve",
      data: {
        status: "rejected",
        to: store.user.email,
        username: store.user.name,
        id: store.id,
        storename: store.storename,
        rejectDescription: store.reasonForRejection,
      },
    });
    return res.json({ message: "Store rejected", success: true });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, success: false });
  }
};
//-------------Adding new Category--------------
export const addCategory = async (req, res) => {
  const { category } = req.body;
  try {
    const cat = await prisma.category.create({
      data: {
        name: category,
      },
    });
    console.log(typeof cat);
    return res.json({ message: "Added Cateogory", success: true, cat });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};
//-------------Get Category-------------------
export const getCategory = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    if (!categories) {
      return res.json({ message: "No categories found", success: false });
    }
    return res.json({ success: true, categories });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};
//-----------------For adding coupens-----------------
export const addCoupens = async (req, res) => {
  const data = req.body;
  try {
    const coupens = await prisma.coupens.create({
      data: {
        code: data.code.toUpperCase(),
        maxCartValue: Number(data.maxCartValue),
        discountType: data.discountType,
        discountValue: Number(data.discount),
        expiresAt: new Date(data.expDate),
        forPlus: data.forMember,
        forNewUser: data.forNew,
        maxDiscount: Number(data.maxDiscountValue),
        isActive: true,
        description: data.description,
      },
    });
    console.log(coupens);
    return res
      .status(200)
      .json({ message: "Coupen added", success: true, coupens });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, success: false });
  }
};
//----------------Controller to get coupens
export const getCoupens = async (req, res) => {
  try {
    const coupens = await prisma.coupens.findMany();
    if (coupens) {
      return res.json({ success: true, coupens });
    }
    return res.json({ message: "Coupens doesn't exist" });
  } catch (error) {
    console.log(error);
  }
};
//-------------Controller to change status of coupen
export const changeCoupenStatus = async (req, res) => {
  const { value, id } = req.body;
  try {
    const coupen = await prisma.coupens.update({
      where: {
        id: Number(id),
      },
      data: {
        isActive: value,
      },
    });
    return res.json({ success: true, coupen });
  } catch (error) {
    return res.json({ error: error.message, success: false });
  }
};
// Controller to get all details for adminDasboard--------------------
export const allDetails = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    const sellers = await prisma.seller.findMany();
    const products = await prisma.product.findMany();

    const totalOrders = orders.length;
    const totalSellers = sellers.length;
    const totalProducts = products.length;
    const totalRevenue = orders.reduce((a, i) => a + i.totalAmount, 0);
    console.log(
      "Hello",
      totalSellers,
      totalOrders,
      totalProducts,
      totalRevenue
    );
    return res.json({
      success: true,
      totalOrders,
      totalRevenue,
      totalSellers,
      totalProducts,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
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
//Controller to contact the admin----------------
export const contact = async (req, res) => {
  const { formData } = req.body;
  try {
    //Send the form data to admin using email
    await sendContactMessage(formData);
    return res.json({
      message: "Form submitted.Thankyou for contacting us!",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message });
  }
};
