import { prisma } from "../../config/db.config.js";
import imagekit from "../../config/imageKit.js";
import { inngest } from "../client.js";

export const productHandler = inngest.createFunction(
  {
    id: "product_task_handler",
  },
  {
    event: "product/product.setup",
  },
  async ({ event, step }) => {}
);
