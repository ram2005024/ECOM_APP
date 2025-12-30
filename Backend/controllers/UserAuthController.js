import bcrypt from "bcryptjs";
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
    const isMatchPassword = userExist.password === password;
    // const isMatchPassword = await compareHash(password, userExist.password);
    if (!isMatchPassword)
      return res.json({ message: "Password didn't match", success: false });
    userExist.password = undefined;
    const token = await generateToken(userExist);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "production",
      sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    return res.json({
      message: "Logged in successful",
      success: true,
      user: {
        ...userExist,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, status: false });
  }
};
//--------------Getting user-----------------------
export const getUser = async (req, res) => {
  const user = req.user;
  console.log(req.user);
  return res.json({
    success: true,
    user,
  });
};
//Handle logout--------------------------------
export const handleLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "Logout successful", success: true });
  } catch (error) {
    return res.json({ message: error, success: false });
  }
};
//Handle seller register
export const sellerRegister = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name)
    return res.json({ message: "All fields are required", success: false });

  try {
    const userExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExist)
      return res.json({ success: false, message: "User already exists" });
    //hash the password and save into the database
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashPassword,
        name: name,
        role: "seller",
      },
    });
    const token = await generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "production",
      sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    user.password = undefined;
    return res.json({
      message: "Registered user successfully",
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, status: false });
  }
};
