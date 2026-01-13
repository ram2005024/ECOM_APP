import { generateToken } from "../libs/userAuthHelper.js";

// For google redirect
export const googleAuthController = async (req, res) => {
  const user = req.user;

  try {
    if (!user)
      return res.status(500).json({ message: "Server error", success: false });
    const token = await generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    user.password = undefined;

    return res.redirect(process.env.CLIENT_URL);
  } catch (error) {
    console.log(error);
  }
};
