import Product from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* CREATE */
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      image,
      banner,
      price,
      brand,
      description,
      countInStock,
      isFeatured,
    } = req.body;

    const result = await cloudinary.uploader.upload(image, {
      width: 500,
      height: 500,
      crop: "fill",
    });
    const imageUrl = result.secure_url;

    const bannerImage = banner
      ? await cloudinary.uploader.upload(banner, {
          width: 1920,
          height: 1080,
          crop: "fill",
        })
      : "";
    const bannerUrl = banner ? bannerImage.secure_url : "";

    const product = await Product.create({
      name,
      category,
      image: imageUrl,
      banner: bannerUrl,
      price,
      brand,
      description,
      countInStock,
      isFeatured,
    });
    console.log(product);

    res.status(201).json(product);
  } catch (error) {
    res.json({ error: error.message });
  }
};

/* READ */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Product.find().distinct("category");
    const brands = await Product.find().distinct("brand");

    res.json({ categories, brands });
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { query, category, brand, price, rating, page, sort } = req.query;
    const LIMIT = 2;
    const startingIndex = (Number(page) - 1) * LIMIT;
    const order =
      sort === "featured"
        ? { isFeatured: -1 }
        : sort === "lowest"
        ? { price: 1 }
        : sort === "highest"
        ? { price: -1 }
        : sort === "topRated"
        ? { rating: -1 }
        : sort === "newest"
        ? { createdAt: -1 }
        : { _id: -1 };

    const totalProduct = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    }).countDocuments({});

    let products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    })
      .sort(order)
      .limit(LIMIT)
      .skip(startingIndex);

    if (category !== "" && category.toLowerCase() !== "all") {
      products = products.filter((product) => product.category == category);
    }

    if (brand !== "" && brand.toLowerCase() !== "all") {
      products = products.filter((product) => product.brand == brand);
    }

    if (price !== "" && price.toLowerCase() !== "all") {
      products = products.filter(
        (product) =>
          +product.price >= +price.split("-")[0] &&
          +product.price <= +price.split("-")[1]
      );
    }

    if (rating !== "" && rating.toLowerCase() !== "all") {
      products = products.filter((product) => +product.rating >= +rating);
    }

    res.json({
      products,
      currentPage: Number(page),
      numberOfPages: Math.ceil(totalProduct / LIMIT),
      totalProduct,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

/* UPDATE */
export const updateProduct = async (req, res) => {
  try {
    const {
      _id,
      name,
      category,
      image,
      price,
      banner,
      brand,
      countInStock,
      isFeatured,
      description,
      numReviews,
    } = req.body;

    const result = !image.includes("http")
      ? await cloudinary.uploader.upload(image, {
          width: 500,
          height: 500,
          crop: "fill",
        })
      : image;
    const imageUrl = !image.includes("http") ? result.secure_url : image;

    const bannerImage =
      banner && !banner.includes("http")
        ? await cloudinary.uploader.upload(banner, {
            width: 1920,
            height: 1080,
            crop: "fill",
          })
        : banner;
    const bannerUrl = !image.includes("http") ? bannerImage.secure_url : banner;

    const product = await Product.findByIdAndUpdate(
      _id,
      {
        name,
        image: imageUrl,
        banner: bannerUrl,
        price,
        category,
        isFeatured,
        description,
        numReviews,
        countInStock,
        brand,
      },
      { new: true }
    );

    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

/* DELETE */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.findByIdAndRemove(id);

    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.json({ message: error.message });
  }
};
