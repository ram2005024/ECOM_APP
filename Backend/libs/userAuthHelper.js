import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const generateToken = async (id, name) => {
  try {
    const token = jwt.sign(
      { userID: id, userName: name },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return token;
  } catch (error) {
    console.log(error.message);
  }
};
export const compareHash = async (pwd, hashPwd) => {
  try {
    const isMatch = await bcrypt.compare(pwd, hashPwd);
    return isMatch;
  } catch (error) {
    console.log(error.message);
  }
};
