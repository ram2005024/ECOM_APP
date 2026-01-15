import nodemailer from "nodemailer";
import { sellerRegister } from "./EmailTemplate/sellerRegistationTemplate.js";
import { adminReviewEmail } from "./EmailTemplate/adminReview.js";
import { approveSuccessEmail } from "./EmailTemplate/approveSuccess.js";
import { rejectMessageTemplate } from "./EmailTemplate/rejectMessage.js";
import { sendSellerNotificationTemplate } from "./EmailTemplate/sellerOrderNotification.js";
import { sendUserOrderStatus } from "./EmailTemplate/sendStatusMessage.js";
import { contactEmailTemplate } from "./EmailTemplate/contactFormTemplate.js";
import axios from "axios"
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
export const sendContactMessage =async(formData)=>{
  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: {
          name: "My App", 
          email: "sharmashekhar20050@gmail.com" // MUST be verified in Brevo
        },
        to: [
          {
            email: "sharmashekhar20050@gmail.com"
          }
        ],
        subject: formData.subject,
        htmlContent: `<html><body><p>{formData.message}</p></body></html>`
      },
      {
        headers: {
          'accept': 'application/json',
          'api-key': "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", // Use the xkeysib- key here
          'content-type': 'application/json'
        }
      }
    );

    console.log("Email sent successfully:", response.data);
    return response.data;
    
  } catch (error) {
    console.error("Error sending email:", error.response ? error.response.data : error.message);
    throw error;
  }
}
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
