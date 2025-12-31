import { approvalMessage, rejectionMessage } from "../../config/sendEmail.js";
import { inngest } from "../client.js";
export const storeApproval = inngest.createFunction(
  {
    id: "Store approval state",
  },
  { event: "admin/store.approve" },
  async ({ event, step }) => {
    //Handle when the seller is approved
    if (event.data.status === "approved") {
      await step.run("store_when_approved", async () => {
        await approvalMessage({
          to: event.data.to,
          subject: "Your store is approved",
          storename: event.data.storename,
          username: event.data.username,
          id: event.data.id,
          registrationDate: event.data.registerDate,
          approvedAt: event.data.approvedAt,
        });
        return {
          status: "Sent congratulations message to store seller",
          to: event.data.to,
        };
      });
    } else {
      //----------Handle when the store is rejected---------
      await step.run("store_when_rejected", async () => {
        await rejectionMessage({
          to: event.data.to,
          subject: "Your store is rejected",
          storename: event.data.storename,
          username: event.data.username,
          id: event.data.id,
          rejectionMessage: event.data.rejectDescription,
        });
        return {
          status: "Sent appology message to store seller",
          to: event.data.to,
        };
      });
    }
  }
);
