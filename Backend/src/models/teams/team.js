import pool from "../../../db/config.js";

export const createTeamTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS teams (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log("✅ teams table created");
  } catch (error) {
    console.error("❌ Error creating teams table", error);
  }
};

export const insertDefaultTeams = async () => {
  const query = `
    INSERT INTO teams (name)
    VALUES
      ('Insurance'),
      ('Health'),
      ('Education')
    ON CONFLICT (name) DO NOTHING;
  `;

  try {
    await pool.query(query);
    console.log("✅ Default teams inserted successfully");
  } catch (error) {
    console.error("❌ Error inserting default teams", error);
  }
};
