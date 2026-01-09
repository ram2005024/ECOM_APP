import { prisma } from "../config/db.config.js";

export const protectSellerRoute = async (req, res, next) => {
  const user = req.user;
  //USER ALREADY VERIFIED BY PREVIOUS MIDDLEWARE CHECK ACTIVE SELLER
  try {
    const seller = await prisma.seller.findFirst({
      where: { userID: user.id },
    });
    if (!seller)
      return res
        .status(401)
        .json({ message: "Unauthorized access", success: false });
    //If seller exists check if he/she is active or not
    if (!seller.isActive)
      return res
        .status(403)
        .json({ message: "Seller is inactive", success: false });
    next();
  } catch (error) {
    return res.json({ message: error.message });
  }
};
