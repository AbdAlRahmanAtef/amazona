import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, isAdmin } = req.body;
    const isFound = await User.findOne({ email });

    if (isFound) {
      res.status(400).json({ message: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      isAdmin,
    });

    const token = jwt.sign({ email: user.email, id: user._id }, "test");

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      res.status(400).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );

    if (!isPasswordCorrect) {
      res.status(400).json({ message: "invalid username or password" });
    }

    const token = jwt.sign(
      { email: foundUser.email, id: foundUser._id },
      process.env.JWT_SECRET_KEY
    );

    res.status(200).json({ user: foundUser, token });
  } catch (error) {
    res.json({ error: error.message });
  }
};
