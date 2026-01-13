import path from "path";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";
export const uploadImage = async (file) => {
  const uploadDir = "uploads";
  //Upload image into the local storage for local NODE_ENV
  if (process.env.NODE_ENV !== "development") {
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
  } else {
    // Upload image into the cloud storage if the mode in deployment
    const base64File = `data:${file.mimetype};base64,${file.buffer.toString(
      "base64"
    )}`;

    const result = await cloudinary.uploader.upload(base64File, {
      folder: "product_image",
      public_id: `product_${Date.now()}`,
    });

    return result.secure_url;
  }
};
