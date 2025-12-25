import pool from "../../../db/config.js";

export const createPermissionTable = async () => {
  const query = `CREATE TABLE IF NOT EXISTS permissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL
    );`;
  try {
    await pool.query(query);
    console.log("✅ permissions table created");
  }
  catch (error) {
    console.error("❌ Error creating permissions table", error);
  }
}

export const insertDefaultRolePermissions = async () => {
  const query = `
    INSERT INTO permissions (name)
    VALUES
      ('CREATE_STAFF'),
      ('DELETE_STAFF'),
      ('UPDATE_STAFF'),
      ('VIEW_STAFF'),
      ('CREATE_USER'),
      ('DELETE_USER'),
      ('UPDATE_USER'),
      ('VIEW_USERS'),
      ('CREATE_ROLE'),
      ('UPDATE_ROLE'),
      ('DELETE_ROLE'),
      ('CREATE_ROLE'),
      ('CREATE_TEAM'),
      ('DELETE_TEAM'),
      ('UPDATE_TEAM'),
      ('VIEW_TEAMS'),
      ('CREATE_PLAN'),
      ('UPDATE_PLAN'),
      ('DELETE_PLAN'),
      ('CREATE_TEAM'),
      ('DELETE_TEAM'),
      ('UPDATE_TEAM'),
      ('VIEW_TEAMS')
    ON CONFLICT (name) DO NOTHING;
  `;

  try {
    await pool.query(query);
    console.log("✅ Default permissions inserted");
  } catch (error) {
    console.error("❌ Error inserting permissions", error);
  }
};





export const createRolePermissionTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS role_permissions (
      id SERIAL PRIMARY KEY,
      role_id INT NOT NULL,
      permission_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      CONSTRAINT fk_role
        FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,

      CONSTRAINT fk_permission
        FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,

      UNIQUE (role_id, permission_id)
    );`;
  try {
    await pool.query(query);
    console.log("✅ role_permissions table created");
  }
  catch (error) {
    console.error("❌ Error creating role_permissions table", error);
  }
};


