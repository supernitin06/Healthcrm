import pool from "../../../db/config.js";
import bcrypt from "bcrypt";

export const registerStaff = async ({ username, email, password, role_id }) => {
    if (!username || !email || !password || !role_id) {
        throw new Error("All fields are required");
    }

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

    // 🔹 Insert staff
    const staffResult = await pool.query(
        `
    INSERT INTO staff (username, email, password, role_id, role_name)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, username, email, role_name, created_at;
    `,
        [username, email, hashedPassword, role_id, role.name]
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


export const updateStaff = async (id, { username, email, password, role_id }) => {
    const { rows } = await pool.query(
        `
    UPDATE staff
    SET username = $1,
        email = $2,
        password = $3,
        role_id = $4
    WHERE id = $5
    RETURNING id, username, email, role_name, created_at;
    `,
        [username, email, password, role_id, id]
    );
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



export const registerSuperAdmin = async ({ username, email, password, role_id }) => {
    if (!username || !email || !password || !role_id) {
        throw new Error("All fields are required");
    }

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

    // 🔹 Insert superadmin staff
    const staffResult = await pool.query(
        `
    INSERT INTO staff (username, email, password, role_id, role_name)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, username, email, role_name, created_at;
    `,
        [username, email, hashedPassword, role.id, role.name]
    );

    return staffResult.rows[0];
};
