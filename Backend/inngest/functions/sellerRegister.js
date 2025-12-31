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
        type: "resend",
        subject:
          event.data.type === "resend"
            ? "Thanks for re-registering your store!"
            : "Thanks for registering your store",
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
        type: "resend",
        subject:
          event.data.type === "resend"
            ? "Re-approval request for a store"
            : "New approval request for store",
        storename: event.data.storename,
        username: event.data.username,
        id: event.data.storeID,
        registrationDate: event.data.registerDate,
      });
      return { status: "Email Sent", to: "sharmashekhar20050@gmail.com" };
    });
  }
);
