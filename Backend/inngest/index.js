// inngest/index.js
import { inngest } from "./client.js";
import { sellerRegister } from "./functions/sellerRegister.js";
import { storeApproval } from "./functions/storeApproval.js";

export const functions = [sellerRegister, storeApproval];
export { inngest };
