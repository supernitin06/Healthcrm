import pool from "../../../db/config.js";
import bcrypt from "bcrypt";



export const registerUser = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    throw new Error("All fields are required");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { rows } = await pool.query(
    `
    INSERT INTO users (username, email, password, role_id, role_name)
    VALUES (
      $1,
      $2,
      $3,
      (SELECT id FROM roles WHERE name = 'user'),
      'user'
    )
    RETURNING id, username, email, role_name, created_at;
    `,
    [username, email, hashedPassword]
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