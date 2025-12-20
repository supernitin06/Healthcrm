import { assignPermissionToRole } from "../models/constant/role.js";


export const seedRolePermissions = async () => {
    // SUPER ADMIN → ALL
    await assignPermissionToRole("superadmin", "CREATE_STAFF");
    await assignPermissionToRole("superadmin", "DELETE_STAFF");
    await assignPermissionToRole("superadmin", "VIEW_USERS");
    await assignPermissionToRole("superadmin", "CREATE_PLAN");
    await assignPermissionToRole("superadmin", "UPDATE_PLAN");
    await assignPermissionToRole("superadmin", "DELETE_PLAN");

    // ADMIN
    await assignPermissionToRole("admin", "CREATE_STAFF");
    await assignPermissionToRole("admin", "VIEW_USERS");

    // STAFF (example)
    await assignPermissionToRole("staff", "VIEW_USERS");
};
