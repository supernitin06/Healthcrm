import pool from "../../../db/config.js";
import bcrypt from "bcrypt";
import { generateCustomId } from "../../utils/idGenerator.js";

export const registerStaff = async ({ username, email, password, role_id, profile_image }, creator) => {
    if (!username || !email || !password || !role_id) {
        throw new Error("All fields are required");
    }

    const checkRole = await pool.query("SELECT * FROM roles WHERE id = $1", [role_id]);
    if (checkRole.rows.length === 0) {
        throw new Error("Role not found");
    }
    const checkEmail = await pool.query("SELECT * FROM staff WHERE email = $1", [email]);
    if (checkEmail.rows.length > 0) {
        throw new Error("Email already exists");
    }

    const Createdby = creator ? creator.id : null;
    const Updatedby = creator ? creator.id : null;
    const createdbyname = creator ? creator.username : null;
    const updatedbyname = creator ? creator.username : null;

    // 🔹 Check role first
    const roleResult = await pool.query(
        `SELECT name FROM roles WHERE id = $1`,
        [role_id]
    );

    const role = roleResult.rows[0];
    if (!role) {
        throw new Error("Role not found");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = generateCustomId("STF");

    // 🔹 Insert staff
    const staffResult = await pool.query(
        `
    INSERT INTO staff (id, username, email, password, role_id, role_name, profile_image, created_by, updated_by, created_by_name, updated_by_name)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING id, username, email, role_name, profile_image, created_at;
    `,
        [id, username, email, hashedPassword, role_id, role.name, profile_image, Createdby, Updatedby, createdbyname, updatedbyname]
    );

    return staffResult.rows[0];
};



const loginStaff = async ({ email, password }) => {
    const { rows } = await pool.query(
        `
    SELECT * FROM staff WHERE email = $1 
    `,
        [email]
    );
    const user = rows[0];
    if (!user) {
        throw new Error("Staff not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
    return user;
};

export { loginStaff };


export const updateStaff = async (id, { username, email, password, role_id, profile_image }) => {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (username) {
        fields.push(`username = $${paramIndex++}`);
        values.push(username);
    }
    if (email) {
        fields.push(`email = $${paramIndex++}`);
        values.push(email);
    }
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        fields.push(`password = $${paramIndex++}`);
        values.push(hashedPassword);
    }
    if (profile_image) {
        fields.push(`profile_image = $${paramIndex++}`);
        values.push(profile_image);
    }
    if (role_id) {
        const roleResult = await pool.query(`SELECT name FROM roles WHERE id = $1`, [role_id]);
        if (roleResult.rows.length === 0) {
            throw new Error("Role not found");
        }
        fields.push(`role_id = $${paramIndex++}`);
        values.push(role_id);

        fields.push(`role_name = $${paramIndex++}`);
        values.push(roleResult.rows[0].name);
    }

    if (fields.length === 0) {
        throw new Error("No fields provided for update");
    }

    values.push(id);
    const query = `
        UPDATE staff
        SET ${fields.join(", ")}
        WHERE id = $${paramIndex}
        RETURNING id, username, email, role_name, created_at;
    `;

    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
        throw new Error("Staff member not found");
    }

    return rows[0];
};


export const getStaff = async () => {
    const { rows } = await pool.query(
        `
    SELECT * FROM staff
    `
    );
    return rows;
};


export const getStaffById = async (id) => {
    const { rows } = await pool.query(
        `
    SELECT * FROM staff WHERE id = $1
    `,
        [id]
    );
    return rows[0];
};



export const registerSuperAdmin = async ({ username, email, password, role_id, profile_image }) => {
    if (!username) throw new Error("Username is required");
    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");
    if (!role_id) throw new Error("Role ID is required");

    email = email.toLowerCase();

    // profile_image is optional now

    // 🔹 Check if email already exists
    const existingUser = await pool.query(`SELECT id FROM staff WHERE email = $1`, [email]);
    if (existingUser.rows.length > 0) {
        throw new Error("Email already exists");
    }

    // 🔹 Get superadmin role id
    // 🔹 Get superadmin role id
    const roleResult = await pool.query(
        `SELECT id, name FROM roles WHERE id = $1`,
        [role_id]
    );

    const role = roleResult.rows[0];
    if (!role) {
        throw new Error("Superadmin role not found");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = generateCustomId("STF");

    // 🔹 Insert superadmin staff
    const staffResult = await pool.query(
        `   
    INSERT INTO staff (id, username, email, password, role_id, role_name, profile_image)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id, username, email, role_name, profile_image, created_at;   
    `,
        [id, username, email, hashedPassword, role.id, role.name, profile_image]
    );

    return staffResult.rows[0];
};
