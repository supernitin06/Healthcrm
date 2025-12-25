import pool from "../../../db/config.js";
import bcrypt from "bcrypt";


export const registerUser = async (
  { username, email, password, role_id, team_id, role_name },
  creator
) => {

  if (!username || !email || !password) {
    throw new Error("All fields are required");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // 🔹 SELF REGISTRATION
  if (!creator) {
    const { rows } = await pool.query(
      `
      INSERT INTO users (username, email, password, role_id, role_name)
      VALUES ($1, $2, $3, (SELECT id FROM roles WHERE name = 'user'), 'user')
      RETURNING *
      `,
      [username, email, hashedPassword]
    );
    return rows[0];
  }

  // 🔹 CREATED BY ADMIN / SUPERADMIN
  if (!role_id) {
    throw new Error("Role ID is required");
  }

  const { rows } = await pool.query(
    `SELECT name FROM roles WHERE id = $1`,
    [role_id]
  );

  if (rows.length === 0) {
    throw new Error("Role not found");
  }

  const roleName = rows[0].name;

  // 🔐 CORE BUSINESS RULE
  if (roleName === "staff") {
    if (!team_id) {
      throw new Error("Team is required when creating staff");
    }
    else{
      const { rows } = await pool.query(
        `SELECT name FROM teams WHERE id = $1`,
        [team_id]
      );
      if (rows.length === 0) {
        throw new Error("Team not found");
      }
      const teamName = rows[0].name;
    }
  } else {
    team_id = null; // force null for non-staff
    
  }

  const { rows: createdUser } = await pool.query(
    `
    INSERT INTO users (username, email, password, role_id, team_id,team_name,role_name,)
    VALUES ($1, $2, $3, $4, $5,$6,$7,$8)
    RETURNING *
    `,
    [username, email, hashedPassword, role_id, team_id, teamName, roleName]
  );

  return createdUser[0];
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