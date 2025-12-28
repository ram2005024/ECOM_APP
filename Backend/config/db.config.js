import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient({
  log: ["query"],
});
export const connectToDB = async () => {
  if (prisma) return console.log("DB Connection established");
  console.log("Failed to connect DB");
};
