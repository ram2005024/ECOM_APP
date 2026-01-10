export const protectAdmin = async (req, res, next) => {
  const user = req.user;
  //Check the role
  if (user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Not authorized to access this route", success: false });
  }
  next();
};
