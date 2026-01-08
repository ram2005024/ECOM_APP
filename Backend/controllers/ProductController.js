import { prisma } from "../config/db.config.js";
import imagekit from "../config/imageKit.js";
import { openai } from "../config/geminiAI.js";
import { uploadImage } from "../utils/uploadImage.js";
export const addProduct = async (req, res) => {
  const files = req.files;
  try {
    const images = [];
    if (files) {
      for (const file of files) {
        const url = await uploadImage(file);
        images.push(url);
      }
    }
    const product = await prisma.product.create({
      data: {
        sellerId: Number(req.body.sellerId),
        name: req.body.productName,
        description: req.body.productDescription,
        image: images,
        price: Number(req.body.actualPrice),
        offerPrice: Number(req.body.offerPrice),
        categoryId: Number(req.body.categoryId),
      },
    });
    console.log(product);
    return res.json({ message: "Added product", succes: true });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, success: false });
  }
};
//--------Controller to analyze the image-------------
export const analyzeImage = async (req, res) => {
  const prompt = `
You are a product image analysis API.

Input:
A product image.

Task:
Analyze the image and generate a short product title and a clear product description like which product is this as title and description for the product title.

Return ONLY valid JSON.
Do NOT include markdown.
Do NOT include explanations.

Required JSON format:
{
  "title": "",
  "description": ""
}

Rules:
- Title must be short and clear (max 8 words).
-Watch the image carefully bro.
- Description should be 2–3 sentences.
- If something is unclear, make a reasonable assumption based on the image.
`;

  const file = req.file;
  const imageURL = await uploadImage(file);
  console.log(imageURL);
  try {
    const response = await openai.chat.completions.create({
      model: process.env.GEMINI_MODEL,
      messages: [
        { role: "system", content: prompt },
        {
          role: "user",
          content: imageURL,
        },
      ],
      response_format: {
        type: "json_object",
      },
    });
    const output = JSON.parse(response.choices[0].message.content);
    return res.json({ success: true, message: "Analyzed image", output });
  } catch (error) {
    console.log(error.message);
    res.json({ message: "Quota exceeded", success: false });
  }
};
//---------Controller to get product according to seller ---------------
export const getProduct = async (req, res) => {
  try {
    const sellerId = req.query.sellerId;
    const products = await prisma.product.findMany({
      where: {
        sellerId: Number(sellerId),
      },
      include: {
        reviews: true,
      },
    });
    if (products) return res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, succes: false });
  }
};
//---------------To set show off on------------
export const handleShow = async (req, res) => {
  const { pid, value, sellerId } = req.body;
  console.log(value);
  try {
    await prisma.product.update({
      where: {
        id: pid,
      },
      data: {
        show: value,
      },
    });
    const products = await prisma.product.findMany({
      where: {
        sellerId: sellerId,
      },
    });
    return res.json({ success: true, products });
  } catch (error) {
    console.log(error);
  }
};
//--------------Get all products----------------------
export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        seller: true,
        category: true,
        reviews: {
          include: {
            user: true,
          },
        },
      },
    });
    if (!products)
      return res.json({ success: false, message: "No products uploaded yet!" });
    return res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, succes: false });
  }
};
//Controller to add review/rating to the product-----------------
export const addReview = async (req, res) => {
  const { pId, rating, comment } = req.body;
  const userId = req.user.id;
  try {
    //Check if the field is provided or not
    if (!rating && !comment) {
      return res.json({
        success: false,
        message: "Please fill at least one field.",
      });
    }
    //Put the rating for the given product
    await prisma.review.create({
      data: {
        productId: pId,
        userId,
        createdAt: new Date(),
        rating: Number(rating),
        comment: comment ? comment : "",
      },
    });

    return res.json({ message: "Thanks for your review", success: true });
  } catch (error) {
    console.log("Bro", error.message);
  }
};
//Controller to update review/rating to the product-----------------
export const updateReview = async (req, res) => {
  const { reviewId, rating, comment } = req.body;
  console.log(reviewId, rating, comment);
  try {
    //Check if the field is provided or not
    if (!rating && !comment) {
      return res.json({
        success: false,
        message: "Please fill at least one field.",
      });
    }
    //Put the rating for the given product
    await prisma.review.update({
      where: {
        id: Number(reviewId),
      },
      data: {
        rating: Number(rating),
        comment: comment ? comment : "",
        createdAt: new Date(),
      },
    });
    return res.json({ message: "Review updated", success: true });
  } catch (error) {
    console.log("Bro", error.message);
  }
};
