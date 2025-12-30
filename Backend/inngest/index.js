// inngest/index.js
import { inngest } from "./client.js";
import { sellerRegister } from "./functions/sellerRegister.js";

export const functions = [sellerRegister];
export { inngest };
