import pool from "../../../db/config.js";
import { generateCustomId } from "../../utils/idGenerator.js";

export const createTeamTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS teams (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE,
      created_by VARCHAR(50),
      updated_by VARCHAR(50),
      created_by_name VARCHAR(50),
      updated_by_name VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    await pool.query(`ALTER TABLE teams ADD COLUMN IF NOT EXISTS created_by VARCHAR(50)`);
    await pool.query(`ALTER TABLE teams ADD COLUMN IF NOT EXISTS updated_by VARCHAR(50)`);
    await pool.query(`ALTER TABLE teams ADD COLUMN IF NOT EXISTS created_by_name VARCHAR(50)`);
    await pool.query(`ALTER TABLE teams ADD COLUMN IF NOT EXISTS updated_by_name VARCHAR(50)`);
    await pool.query(`ALTER TABLE teams ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`);
    console.log("✅ teams table created");
  } catch (error) {
    console.error("❌ Error creating teams table", error);
  }
};

export const insertDefaultTeams = async () => {
  const teams = [
    'Insurance',
    'Health',
    'Education'
  ];
  const values = [];
  const params = [];
  let paramIndex = 1;

  for (const team of teams) {
    params.push(generateCustomId("TEM"), team);
    values.push(`($${paramIndex}, $${paramIndex + 1})`);
    paramIndex += 2;
  }

  const query = `
    INSERT INTO teams (id, name)
    VALUES ${values.join(", ")}
    ON CONFLICT (name) DO NOTHING;
  `;

  try {
    await pool.query(query, params);
    console.log("✅ Default teams inserted successfully");
  } catch (error) {
    console.error("❌ Error inserting default teams", error);
  }
};
