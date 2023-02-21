import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  rating: { type: Number, default: Math.trunc(Math.random() * 6) },
  numReviews: { type: Number, default: Math.trunc(Math.random() * 1000) },
  description: { type: String, required: true },
  countInStock: { type: Number, default: 1 },
  isFeatured: { type: Boolean, default: false },
  banner: String,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
