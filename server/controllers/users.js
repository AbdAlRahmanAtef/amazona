import bcrypt from "bcrypt";

import User from "../models/User.js";

/* READ */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

/* UPDATE */
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, isAdmin } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndUpdate(id, { name, email, isAdmin }, { new: true });

    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

/* DELETE */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await User.findById(id);

    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    await User.findByIdAndRemove(id);

    const users = await User.find();

    res.json({ message: "user deleted", users });
  } catch (error) {
    res.json({ message: error.message });
  }
};
