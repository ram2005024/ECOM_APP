import { prisma } from "../config/db.config.js";
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
