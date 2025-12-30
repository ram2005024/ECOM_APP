import nodemailer from "nodemailer";
import { sellerRegister } from "./EmailTemplate/sellerRegistationTemplate.js";
import { adminReviewEmail } from "./EmailTemplate/adminReview.js";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

export const sendEmail = async ({
  to,
  subject,

  storename,
  username,
  id,
}) => {
  await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to,
    subject,
    html: sellerRegister(storename, username, id),
  });
};
export const sendAdminMessage = async ({
  to,
  subject,
  storename,
  username,
  id,
  registrationDate,
}) => {
  await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to,
    subject,
    html: adminReviewEmail(storename, username, id, registrationDate),
  });
};
