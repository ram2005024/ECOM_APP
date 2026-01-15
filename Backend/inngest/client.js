import { Inngest } from "inngest";
export const inngest = new Inngest({
  id: "ECOM_APP",
  signingKey: process.env.INNGEST_SIGNING_KEY,
  eventKey:process.env.INNGEST_EVENT_KEY,
    baseUrl: "https://ecom-app-1-lte5.onrender.com",
});
