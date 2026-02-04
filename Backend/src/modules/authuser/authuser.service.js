import pool from "../../../db/config.js";
import bcrypt from "bcrypt";
import { generateCustomId } from "../../utils/idGenerator.js";



export const registerUser = async ({ username, email, password, profile_image }) => {
  if (!username || !email || !password) {
    throw new Error("All fields are required");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const id = generateCustomId("USR");

  const { rows } = await pool.query(
    `
    INSERT INTO users (id, username, email, password, profile_image) 
    VALUES (
      $1,
      $2,
      $3,
      $4,
      $5
    )
    RETURNING id, username, email, profile_image, created_at;
    `,
    [id, username, email, hashedPassword, profile_image]
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


export const updateUser = async (id, { username, email, password }) => {
  const { rows } = await pool.query(
    `
    UPDATE users
    SET username = $1,
        email = $2,
        password = $3
    WHERE id = $4
    RETURNING id, username, email, created_at;
    `,
    [username, email, password, id]
  );
  return rows[0];
};

export const getUser = async () => {
  const { rows } = await pool.query(
    `
    SELECT * FROM users
    `
  );
  return rows;
};

export const getUserById = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT * FROM users WHERE id = $1
    `,
    [id]
  );
  return rows[0];
};
