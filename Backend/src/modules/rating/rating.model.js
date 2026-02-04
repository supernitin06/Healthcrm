import pool from "../../../db/config.js";

export const createRatingTables = async () => {
    const tables = [
        `CREATE TABLE IF NOT EXISTS doctor_ratings (
            id SERIAL PRIMARY KEY,
            doctor_id VARCHAR(50) REFERENCES doctors(id) ON DELETE CASCADE,
            user_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
            rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
            review_msg TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS health_test_ratings (
            id SERIAL PRIMARY KEY,
            health_test_id VARCHAR(50) REFERENCES health_tests(id) ON DELETE CASCADE,
            user_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
            rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
            review_msg TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS staff_ratings (
            id SERIAL PRIMARY KEY,
            staff_id VARCHAR(50) REFERENCES staff(id) ON DELETE CASCADE,
            user_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
            rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
            review_msg TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS insurance_ratings (
            id SERIAL PRIMARY KEY,
            insurance_id VARCHAR(50) REFERENCES insurance(id) ON DELETE CASCADE,
            user_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
            rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
            review_msg TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`
    ];

    for (const query of tables) {
        try {
            await pool.query(query);
        } catch (error) {
            console.error("❌ Error creating rating table:", error.message);
        }
    }
    console.log("✅ Rating tables created");

    // Add average_rating columns to parent tables
    const alterQueries = [
        "ALTER TABLE doctors ADD COLUMN IF NOT EXISTS average_rating DECIMAL(3, 2) DEFAULT 0",
        "ALTER TABLE health_tests ADD COLUMN IF NOT EXISTS average_rating DECIMAL(3, 2) DEFAULT 0",
        "ALTER TABLE staff ADD COLUMN IF NOT EXISTS average_rating DECIMAL(3, 2) DEFAULT 0",
        "ALTER TABLE insurance ADD COLUMN IF NOT EXISTS average_rating DECIMAL(3, 2) DEFAULT 0"
    ];

    for (const query of alterQueries) {
        try {
            await pool.query(query);
        } catch (error) {
            console.error("❌ Error adding average_rating column:", error.message);
        }
    }
    console.log("✅ Average rating columns checked/added");
};
