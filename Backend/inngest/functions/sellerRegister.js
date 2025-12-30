import { sendAdminMessage, sendEmail } from "../../config/sendEmail.js";
import { inngest } from "../client.js";
export const sellerRegister = inngest.createFunction(
  {
    id: "handle-seller-registration",
  },
  {
    event: "seller/registration.submitted",
  },
  async ({ event, step }) => {
    //Send registration send message to seller
    await step.run("seller-notify-register", async () => {
      await sendEmail({
        to: event.data.email,
        subject: "Thanks for registering you store!",
        storename: event.data.storename,
        username: event.data.username,
        id: event.data.storeID,
      });
      return { status: "Email Sent", to: event.data.email };
    });

    //Sending the approval request message to admin
    await step.run("admin-notify-register", async () => {
      await sendAdminMessage({
        to: "sharmashekhar20050@gmail.com",
        subject: "New store approval request",
        storename: event.data.storename,
        username: event.data.username,
        id: event.data.storeID,
        registrationDate: event.data.registerDate,
      });
    });
  }
);
