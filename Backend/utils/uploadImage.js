import path from "path";
import fs from "fs";
import imagekit from "../config/imageKit.js";
export const uploadImage = async (file) => {
  const uploadDir = "uploads";
  //Upload image into the local storage for local NODE_ENV
  if (process.env.NODE_ENV === "development") {
    //Check if the folder to store file exists or not
    if (!fs.existsSync(uploadDir)) {
      //Make a directory if it doesnot exist.
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    //Put that file with unique name in that created dir.
    const fileName = Date.now() + path.extname(file.originalname);
    //Join the fileName to along with the directory
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, file.buffer);
    return `/uploads/${fileName}`;
  }
  // Upload image into the cloud storage if the mode in deployment
  const upload = await imagekit.upload({
    file: file.buffer,
    folder: "/product_image",
    fileName: `product_${Date.now()}`,
  });
  const imageURL = upload.url;
  return imageURL;
};
