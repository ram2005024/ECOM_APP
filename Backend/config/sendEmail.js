import nodemailer from "nodemailer";
import { sellerRegister } from "./EmailTemplate/sellerRegistationTemplate.js";
import { adminReviewEmail } from "./EmailTemplate/adminReview.js";
import { approveSuccessEmail } from "./EmailTemplate/approveSuccess.js";
import { rejectMessageTemplate } from "./EmailTemplate/rejectMessage.js";
import { sendSellerNotificationTemplate } from "./EmailTemplate/sellerOrderNotification.js";

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
  type,
  storename,
  username,
  id,
}) => {
  await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to,
    subject,
    html: sellerRegister(storename, username, id, type),
  });
};
export const sendAdminMessage = async ({
  to,
  type,
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
    html: adminReviewEmail(storename, username, id, type, registrationDate),
  });
};
export const approvalMessage = async ({
  to,
  subject,
  storename,
  username,
  id,
  registrationDate,
  approvedAt,
}) => {
  await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: to,
    subject: subject,
    html: approveSuccessEmail(
      storename,
      username,
      id,
      registrationDate,
      approvedAt
    ),
  });
};
export const rejectionMessage = async ({
  to,
  subject,
  storename,
  username,
  id,
  rejectionMessage,
}) => {
  await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: to,
    subject: subject,
    html: rejectMessageTemplate(storename, username, id, rejectionMessage),
  });
};
export const sendSellerNotification = async ({
  to,
  subject,
  storename,
  sellername,
  customerName,
}) => {
  await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: to,
    subject: subject,
    html: sendSellerNotificationTemplate(storename, sellername, customerName),
  });
};
