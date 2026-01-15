import nodemailer from "nodemailer";
import { sellerRegister } from "./EmailTemplate/sellerRegistationTemplate.js";
import { adminReviewEmail } from "./EmailTemplate/adminReview.js";
import { approveSuccessEmail } from "./EmailTemplate/approveSuccess.js";
import { rejectMessageTemplate } from "./EmailTemplate/rejectMessage.js";
import { sendSellerNotificationTemplate } from "./EmailTemplate/sellerOrderNotification.js";
import { sendUserOrderStatus } from "./EmailTemplate/sendStatusMessage.js";
import { contactEmailTemplate } from "./EmailTemplate/contactFormTemplate.js";

const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 465,
      secure: true, 
      auth: {
        user: process.env.BREVO_USER, // Your Brevo SMTP Login
        pass: process.env.BREVO_PASS, // Your Brevo SMTP Master Password/Key
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
export const sendContactMessage = async (formData) => {
  
     await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: "sharmashekhar20050@gmail.com",
    subject: "Contact appeal from a user",
    html: contactEmailTemplate({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    }),
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
export const sendUserNotificationAboutOrderStatus = async ({
  to,
  subject,
  storename,
  productName,
  customerName,
  status,
}) => {
  await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: to,
    subject,
    html: sendUserOrderStatus(storename, productName, customerName, status),
  });
};
