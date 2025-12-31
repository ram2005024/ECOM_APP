import { prisma } from "../config/db.config.js";
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
