import { Resend } from "resend";
import { sellerRegister } from "./EmailTemplate/sellerRegistationTemplate.js";
import { adminReviewEmail } from "./EmailTemplate/adminReview.js";
import { approveSuccessEmail } from "./EmailTemplate/approveSuccess.js";
import { rejectMessageTemplate } from "./EmailTemplate/rejectMessage.js";
import { sendSellerNotificationTemplate } from "./EmailTemplate/sellerOrderNotification.js";
import { sendUserOrderStatus } from "./EmailTemplate/sendStatusMessage.js";
import { contactEmailTemplate } from "./EmailTemplate/contactFormTemplate.js";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.RESEND_FROM;

const send = async ({ to, subject, html }) => {
  return await resend.emails.send({
    from: FROM,
    to,
    subject,
    html,
  });
};

export const sendEmail = async ({
  to,
  subject,
  type,
  storename,
  username,
  id,
}) => {
  return send({
    to,
    subject,
    html: sellerRegister(storename, username, id, type),
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
  return send({
    to,
    subject,
    html: adminReviewEmail(storename, username, id, registrationDate),
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
  return send({
    to,
    subject,
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
  return send({
    to,
    subject,
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
  return send({
    to,
    subject,
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
  return send({
    to,
    subject,
    html: sendUserOrderStatus(storename, productName, customerName, status),
  });
};

export const sendContactMessage = async (formData) => {
  return send({
    to: "sharmashekhar20050@gmail.com",
    subject: formData.subject,
    html: contactEmailTemplate(formData),
  });
};
