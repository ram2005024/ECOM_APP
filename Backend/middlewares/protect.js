import jwt from "jsonwebtoken";
export const protectRoute = async (req, res, next) => {
  const token = req.cookies?.token;

  try {
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Invalid/missing token" });
    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log(data);
    req.user = data.user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid/missing token" });
  }
};
