import { prisma } from "../config/db.config.js";
import { compareHash, generateToken } from "../libs/userAuthHelper.js";
//--------------------Login Controller--------------------------------
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({ message: "All fields are required", success: false });
  try {
    const userExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!userExist)
      return res.json({ success: false, message: "User doesn't exist" });
    const isMatchPassword = password === userExist.password;
    //  await compareHash(password, userExist.password);
    if (!isMatchPassword)
      return res.json({ message: "Password didn't match", success: false });
    const token = await generateToken(userExist.id, userExist.name);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "production",
      sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    });
    return res.json({
      message: "Logged in successful",
      success: true,
      user: {
        userID: userExist.id,
        userName: userExist.name,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, status: false });
  }
};
//--------------Getting user-----------------------
export const getUser = async (req, res) => {
  const userID = req.userID;
  const userName = req.userName;
  return res.json({ success: true, user: { userID, userName } });
};
