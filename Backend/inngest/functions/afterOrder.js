import { inngest } from "../client.js";
import { prisma } from "../../config/db.config.js";
import { sendSellerNotification } from "../../config/sendEmail.js";
export const afterPayment = inngest.createFunction(
  {
    id: "handle-payment-success",
  },
  {
    event: "payment/successful.order",
  },
  async ({ event, step }) => {
    //Send the message to all the sellers
    await step.run("send-message-to-allSellers", async () => {
      const seller = event.data.sellers;
      for (const i of seller) {
        await sendSellerNotification({
          to: i.user.email,
          subject: "Order received!",
          storename: i.storename,
          sellername: i.user.name,
          customerName: event.data.user.name,
        });
      }
    });
  }
);
