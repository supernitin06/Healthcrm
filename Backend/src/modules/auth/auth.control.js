import { registerUser, loginUser } from "./auth.service.js";

export const registerUserController = async (req, res) => {
  try {
    const creator = req.user || null;

    const user = await registerUser(req.body, creator);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const user = await loginUser(req.body.email, req.body.password);
    res.status(200).json(user);
    if(!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = jwt.sign({id : user.id , user: user }, process.env.secret_key, { expiresIn: "1h" }) ;
    res.cookie("token", token);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

