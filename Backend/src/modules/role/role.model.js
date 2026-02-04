import pool from "../../../db/config.js";
import { generateCustomId } from "../../utils/idGenerator.js";

export const createRoleTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS roles (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(50) NOT NULL UNIQUE,
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
        // Ensure columns exist (migrating old tables if necessary)
        // With primary key change, usually requires drop/re-create or complex migration.
        // Assuming re-creation or fresh start for this sweeping change.
        await pool.query(`ALTER TABLE roles ADD COLUMN IF NOT EXISTS created_by VARCHAR(50)`);
        await pool.query(`ALTER TABLE roles ADD COLUMN IF NOT EXISTS updated_by VARCHAR(50)`);
        await pool.query(`ALTER TABLE roles ADD COLUMN IF NOT EXISTS created_by_name VARCHAR(50)`);
        await pool.query(`ALTER TABLE roles ADD COLUMN IF NOT EXISTS updated_by_name VARCHAR(50)`);
        await pool.query(`ALTER TABLE roles ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`);
        await pool.query(`ALTER TABLE roles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`);

        console.log("✅ roles table created");
    } catch (error) {
        console.error("❌ Error creating roles table", error);
    }
};


export const insertDefaultRoles = async () => {
    const roles = ['Superadmin', 'User', 'Admin', 'Employee', 'Staff'];
    const values = [];
    const params = [];
    let paramIndex = 1;

    for (const role of roles) {
        params.push(generateCustomId("ROL"), role);
        values.push(`($${paramIndex}, $${paramIndex + 1})`);
        paramIndex += 2;
    }

    const query = `
    INSERT INTO roles (id, name) VALUES
    ${values.join(", ")}
    ON CONFLICT (name) DO NOTHING;
    `;

    try {
        await pool.query(query, params);
        console.log("✅ Roles inserted successfully");
    } catch (error) {
        console.error("❌ Error inserting roles", error);
    }
};
