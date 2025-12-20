import pool from "../../../db/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";


export const registerUser = async ({ username, email, password, role_id }, creator) => {

  if(!username || !email || !password) {
    throw new Error("All fields are required");
  }

  if (!creator) {
    // self-registration
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(`
      INSERT INTO users (username, email, password, role_id)
      VALUES ($1, $2, $3, (SELECT id FROM roles WHERE name='user'))
      RETURNING *`,
      [username, email, hashedPassword]
    );
    return rows[0];
  } 

  if(!role_id) {
    throw new Error("Role ID is required when created by admin/staff");
  }

  // creator creating user (admin/staff)
  const { rows } = await pool.query(
    `
    INSERT INTO users (username, email, password, role_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [username, email, hashedPassword, role_id]
  );

  return rows[0];
};


const loginUser = async (email, password) => {
  const { rows } = await pool.query(
    `
    SELECT * FROM users WHERE email = $1 
    `,
    [email]
  );
  const user = rows[0];
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  return user;
};

export { loginUser };