import { registerStaff, loginStaff } from "./authstaff.service.js";
import jwt from "jsonwebtoken";
export const registerStaffcontroller = async (req, res) => {
    try {
        const { username, email, password, role_id } = req.body;
        const user = await registerStaff({ username, email, password, role_id });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export const loginStaffcontroller = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginStaff({ email, password });
        if (user) {
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
        }


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};