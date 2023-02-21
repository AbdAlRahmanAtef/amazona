import express from "express";
import {
  addOrder,
  getOrderById,
  payOrder,
  deliverOrder,
  getUserOrderHistory,
  getAllOrders,
} from "../controllers/order.js";

const router = express.Router();

/* CREATE */
router.post("/", addOrder);

/* READ */
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.get("/history/:id", getUserOrderHistory);

/* UPDATE */
router.put("/:id/pay", payOrder);
router.patch("/:id/deliver", deliverOrder);

export default router;
