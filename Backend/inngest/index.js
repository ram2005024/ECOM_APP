// inngest/index.js
import { inngest } from "./client.js";
import { afterPayment } from "./functions/afterOrder.js";
import { productHandler } from "./functions/product.js";
import { sellerRegister } from "./functions/sellerRegister.js";
import { sendStatus } from "./functions/sendStatus.js";
import { storeApproval } from "./functions/storeApproval.js";

export const functions = [
  sellerRegister,
  storeApproval,
  productHandler,
  afterPayment,
  sendStatus,
];
export { inngest };
