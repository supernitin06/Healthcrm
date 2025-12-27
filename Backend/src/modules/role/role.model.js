import pool from "../../../db/config.js";

export const createRoleTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS roles (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL UNIQUE
      
    );
  `;

    try {
        await pool.query(query);
        console.log("✅ roles table created");
    } catch (error) {
        console.error("❌ Error creating roles table", error);
    }
};


export const insertDefaultRoles = async () => {
    const query = `
    INSERT INTO roles (name) VALUES
    ('user'),
    ('admin'),
    ('superadmin'),
    ('employee')
    ON CONFLICT (name) DO NOTHING;
    `;

    try {
        await pool.query(query);
        console.log("✅ Roles inserted successfully");
    } catch (error) {
        console.error("❌ Error inserting roles", error);
    }
};
