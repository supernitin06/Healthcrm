import pool from "../../../db/config.js";

export const createRoleTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS roles (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL UNIQUE,
      created_by INT,
      updated_by INT,
      created_by_name VARCHAR(50),
      updated_by_name VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      custom_id VARCHAR(50) UNIQUE
    );
  `;

    try {
        await pool.query(query);
        await pool.query(`ALTER TABLE roles ADD COLUMN IF NOT EXISTS created_by INT`);
        await pool.query(`ALTER TABLE roles ADD COLUMN IF NOT EXISTS updated_by INT`);
        await pool.query(`ALTER TABLE roles ADD COLUMN IF NOT EXISTS created_by_name VARCHAR(50)`);
        await pool.query(`ALTER TABLE roles ADD COLUMN IF NOT EXISTS updated_by_name VARCHAR(50)`);
        await pool.query(`ALTER TABLE roles ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`);
        await pool.query(`ALTER TABLE roles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`);
        await pool.query(`ALTER TABLE roles ADD COLUMN IF NOT EXISTS custom_id VARCHAR(50) UNIQUE`);
        console.log("✅ roles table created");
    } catch (error) {
        console.error("❌ Error creating roles table", error);
    }
};


export const insertDefaultRoles = async () => {
    const query = `
    INSERT INTO roles (name) VALUES
    ('superadmin'),
    ('user'),
    ('admin'),
    ('employee'),
    ('staff')
    ON CONFLICT (name) DO NOTHING;
    `;

    try {
        await pool.query(query);
        console.log("✅ Roles inserted successfully");
    } catch (error) {
        console.error("❌ Error inserting roles", error);
    }
};
