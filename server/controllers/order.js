import Order from "../models/Order.js";

/* CREATE */
export const addOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const newOrder = new Order({ ...req.body, user: userId });
    const order = await newOrder.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

/* READ */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).send({ message: "order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getUserOrderHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await Order.find({ user: id });
    if (!orders)
      return res
        .status(404)
        .json({ message: "You do not have previous orders" });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE */
export const payOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (order) {
      if (order.isPaid) {
        return res
          .status(400)
          .json({ message: "Error: Order is already paid" });
      }
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        email_address: req.body.email_address,
      };
    } else {
      return res.status(404).send({ message: "Order not found" });
    }

    const paidOrder = await order.save();

    res
      .status(200)
      .json({ message: "Order updated successfully", order: paidOrder });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const deliverOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).send({ message: "order not found" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        isDelivered: true,
        deliveredAt: Date.now(),
      },
      { new: true }
    );

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
