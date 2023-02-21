import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getCategories,
  searchProducts,
} from "../controllers/products.js";

const router = express.Router();

/* CREATE */
router.post("/", createProduct);

/* READ */
router.get("/", getAllProducts);
router.get("/categories", getCategories);
router.get("/search", searchProducts);
router.get("/:id", getProductById);

/* READ */
router.patch("/update", updateProduct);

/* DELETE */
router.delete("/:id/delete", deleteProduct);

export default router;
