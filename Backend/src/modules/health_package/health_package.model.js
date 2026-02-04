import pool from "../../../db/config.js";

export const createHealthPackageTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS health_packages (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log("✅ Health Packages table created");
  } catch (error) {
    console.error("❌ Error creating health packages table:", error);
  }
};

export const createHealthPackageTestsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS health_package_tests (
      id SERIAL PRIMARY KEY,
      package_id VARCHAR(50) REFERENCES health_packages(id) ON DELETE CASCADE,
      health_test_id VARCHAR(50) REFERENCES health_tests(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(package_id, health_test_id)
    );
  `;
  try {
    await pool.query(query);
    console.log("✅ Health Package Tests (Junction) table created");
  } catch (error) {
    console.error("❌ Error creating health package tests table:", error);
  }
};

export const UserHealthPackageTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS user_health_packages (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
      package_id VARCHAR(50) REFERENCES health_packages(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log("✅ User Health Packages table created");
  } catch (error) {
    console.error("❌ Error creating user health packages table:", error);
  }
};
