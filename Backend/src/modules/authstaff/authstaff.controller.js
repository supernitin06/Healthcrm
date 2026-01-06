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
            user.token = token;
            res.cookie("token", token);
            res.status(200).json({ token, user });
        }


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateStaffcontroller = async (req, res) => {
    try {
        const { id, username, email, password, role_id } = req.body;
        const user = await updateStaff(id, { username, email, password, role_id });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getStaffcontroller = async (req, res) => {
    try {
        const user = await getStaff();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getStaffByIdcontroller = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getStaffById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

