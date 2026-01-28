import pool from "./db/config.js";
import { registerStaff } from "./src/modules/authstaff/authstaff.service.js";

const createAdmin = async () => {
    try {
        const staffData = {
            username: "superadmin",
            email: "super@crm.com",
            password: "111111",
            role_id: "1"
        };
        console.log("Creating superadmin...");
        const user = await registerStaff(staffData);
        console.log("✅ Superadmin created successfully:", user);
    } catch (error) {
        console.error("❌ Error creating superadmin:", error.message);
    } finally {
        await pool.end(); // close pool to exit script
    }
};

createAdmin();
