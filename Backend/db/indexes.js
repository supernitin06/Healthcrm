import pool from "./config.js";

export const createIndexes = async () => {
    const queries = [
        // Staff Table FKs
        `CREATE INDEX IF NOT EXISTS idx_staff_team_id ON staff(team_id);`,
        `CREATE INDEX IF NOT EXISTS idx_staff_role_id ON staff(role_id);`,

        // EmployeeUserAssignTable FKs
        `CREATE INDEX IF NOT EXISTS idx_employee_user_assign_employee_id ON EmployeeUserAssignTable(employee_id);`,
        `CREATE INDEX IF NOT EXISTS idx_employee_user_assign_user_id ON EmployeeUserAssignTable(user_id);`,

        // RolePermissionTable FKs
        `CREATE INDEX IF NOT EXISTS idx_role_permissions_role_id ON role_permissions(role_id);`,
        `CREATE INDEX IF NOT EXISTS idx_role_permissions_permission_id ON role_permissions(permission_id);`,

        // UserInsuranceTable FKs
        `CREATE INDEX IF NOT EXISTS idx_user_insurance_user_id ON user_insurance(user_id);`,
        `CREATE INDEX IF NOT EXISTS idx_user_insurance_insurance_id ON user_insurance(insurance_id);`,

        // UsersOfferTable FKs
        `CREATE INDEX IF NOT EXISTS idx_users_offer_user_id ON users_offer(user_id);`,
        `CREATE INDEX IF NOT EXISTS idx_users_offer_offer_id ON users_offer(offer_id);`,

        // UserHealthTestTable FKs
        `CREATE INDEX IF NOT EXISTS idx_user_health_tests_user_id ON user_health_tests(user_id);`,
        `CREATE INDEX IF NOT EXISTS idx_user_health_tests_health_test_id ON user_health_tests(health_test_id);`,

        // HealthPackageTests FKs (Junction)
        `CREATE INDEX IF NOT EXISTS idx_health_package_tests_package_id ON health_package_tests(package_id);`,
        `CREATE INDEX IF NOT EXISTS idx_health_package_tests_test_id ON health_package_tests(health_test_id);`,

        // UserHealthPackage FKs
        `CREATE INDEX IF NOT EXISTS idx_user_health_packages_user_id ON user_health_packages(user_id);`,
        `CREATE INDEX IF NOT EXISTS idx_user_health_packages_package_id ON user_health_packages(package_id);`
    ];

    try {
        for (const query of queries) {
            await pool.query(query);
        }
        console.log("✅ All foreign key indexes created successfully");
    } catch (error) {
        console.error("❌ Error creating indexes:", error, error.stack);
    }
};
