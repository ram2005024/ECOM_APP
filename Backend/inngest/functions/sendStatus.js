import { prisma } from "../../config/db.config.js";
import { sendUserNotificationAboutOrderStatus } from "../../config/sendEmail.js";
import { inngest } from "../client.js";
export const sendStatus = inngest.createFunction(
  { id: "send-status-message" },
  { event: "status.send" },
  async ({ event, step }) => {
    //Send the message to the user about the status of order items
    await step.run("send-message-to-customer", async () => {
      const productName = event.data.product.name;
      const sellerName = event.data.seller.storename;
      const user = await prisma.user.findFirst({
        where: { id: event.data.userId },
      });
      const to = user.email;
      //Send the message to user
      await sendUserNotificationAboutOrderStatus({
        to: user.email,
        subject: "Order status",
        storename: sellerName,
        productName,
        customerName: user.name,
        status: event.data.status,
      });
    });
  }
);
