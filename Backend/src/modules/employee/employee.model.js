import pool from "../../../db/config.js";


export const AssignUserToEmployeeTable = async () => {

    const query = `
    CREATE TABLE IF NOT EXISTS EmployeeUserAssignTable (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES staff(id),
    user_id INT REFERENCES users(id),
    user_name VARCHAR(100),
    user_email VARCHAR(100),
    user_status BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

    try {
        await pool.query(query);
        console.log("✅ EmployeeUserAssignTable table created");
    } catch (error) {
        console.log(error);
    }
}
