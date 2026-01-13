import { Inngest } from "inngest";
export const inngest = new Inngest({
  id: "ECOM_APP",
  eventKey: process.env.INNGEST_EVENT_KEY,
});
