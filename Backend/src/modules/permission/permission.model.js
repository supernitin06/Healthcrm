import pool from "../../../db/config.js";

export const createPermissionTable = async () => {
  const query = `CREATE TABLE IF NOT EXISTS permissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        permission_type VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
    INSERT INTO permissions (name, permission_type)
    VALUES
      ('CREATE_EMPLOYEE','employee'),
      ('DELETE_EMPLOYEE','employee'),
      ('UPDATE_EMPLOYEE','employee'),
      ('VIEW_EMPLOYEE','employee'),

      ('CREATE_USER','user'),
      ('DELETE_USER','user'),
      ('UPDATE_USER','user'),
      ('VIEW_USERS','user'),

      ('CREATE_ROLE','role'),
      ('UPDATE_ROLE','role'),
      ('DELETE_ROLE','role'),

      ('CREATE_TEAM','team'),
      ('DELETE_TEAM','team'),
      ('UPDATE_TEAM','team'),
      ('VIEW_TEAMS','team'),

      ('CREATE_PLAN','plan'),
      ('UPDATE_PLAN','plan'),
      ('DELETE_PLAN','plan')

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
