import { registerStaff, loginStaff, registerSuperAdmin, updateStaff, getStaff, getStaffById } from "./authstaff.service.js";
import jwt from "jsonwebtoken";

export const registerSuperAdminController = async (req, res) => {
    try {
        const { username, email, password, role_id } = req.body;
        const profile_image = req.file ? req.file.path : null;
        console.log("Register Super Admin Request Body:", req.body);
        console.log("Register Super Admin Request File:", req.file);

        const user = await registerSuperAdmin({ username, email, password, role_id, profile_image });
        res.status(201).json(user);

    } catch (error) {
        console.error("Error in registerSuperAdminController:", error);
        if (error.message === "Email already exists" || error.code === '23505') {
            return res.status(409).json({ error: "Email already exists" });
        }
        res.status(500).json({ error: error.message });
    }
};

export const registerStaffcontroller = async (req, res) => {
    try {
        const { username, email, password, role_id } = req.body;
        const profile_image = req.file?.path || null;
        const user = await registerStaff({ username, email, password, role_id, profile_image }, req.user);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




export const loginStaffcontroller = async (req, res) => {
    try {
        const { email, password } = req.body;
        const staff = await loginStaff({ email, password });
        if (staff) {
            const token = jwt.sign(
                {
                    id: staff.id,
                    username: staff.username,
                    email: staff.email,
                    role_id: staff.role_id
                },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
            staff.token = token;
            res.cookie("token", token);
            res.status(200).json({ token, staff });
        }


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateStaffcontroller = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password, role_id } = req.body;
        const profile_image = req.file ? req.file.path : undefined;
        const user = await updateStaff(id, { username, email, password, role_id, profile_image });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getStaffcontroller = async (req, res) => {
    try {
        const staff = await getStaff();
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getStaffByIdcontroller = async (req, res) => {
    try {
        const { id } = req.params;
        const staff = await getStaffById(id);
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

