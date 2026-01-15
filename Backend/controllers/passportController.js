import { generateToken } from "../libs/userAuthHelper.js";

// For google redirect
export const googleAuthController = async (req, res) => {
  const user = req.user;

  try {
    if (!user)
      return res.status(500).json({ message: "Server error", success: false });
    const token = await generateToken(user);
    console.log(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    user.password = undefined;

    return res.redirect(process.env.CLIENT_URL + "/auth/google/success");
  } catch (error) {
    console.log(error);
  }
};
