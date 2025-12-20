import { registerUser, loginUser } from "./auth.service.js";
import jwt from "jsonwebtoken";


export const registerUserController = async (req, res) => {
  try {
    const creator = req.user || null;

    const user = await registerUser(req.body, creator);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const user = await loginUser(req.body.email, req.body.password);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = jwt.sign(
      {
        id: user.id,
        role_id: user.role_id
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token);
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

