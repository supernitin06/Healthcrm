import { assignPermissionToRole } from "./assignpermissionToRole.js";


export const seedRolePermissions = async () => {

    await assignPermissionToRole("Superadmin", "CREATE_STAFF");
    await assignPermissionToRole("Superadmin", "DELETE_STAFF");
    await assignPermissionToRole("Superadmin", "UPDATE_STAFF");
    await assignPermissionToRole("Superadmin", "GET_STAFF");
    await assignPermissionToRole("Superadmin", "CREATE_PLAN");
    await assignPermissionToRole("Superadmin", "UPDATE_PLAN");
    await assignPermissionToRole("Superadmin", "DELETE_PLAN");
    await assignPermissionToRole("Superadmin", "CREATE_TEAM");
    await assignPermissionToRole("Superadmin", "DELETE_TEAM");
    await assignPermissionToRole("Superadmin", "VIEW_TEAMS");
    // Admin
    await assignPermissionToRole("Admin", "CREATE_STAFF");
    await assignPermissionToRole("Admin", "VIEW_USERS");

    // Staff (example)
    await assignPermissionToRole("Staff", "VIEW_USERS");

    await assignPermissionToRole("Superadmin", "CREATE_PERMISSION");
    // await assignPermissionToRole("Superadmin", "DELETE_PERMISSION");
    await assignPermissionToRole("Superadmin", "UPDATE_PERMISSION");
    await assignPermissionToRole("Superadmin", "ASSIGN_PERMISSION");
    await assignPermissionToRole("Superadmin", "REMOVE_PERMISSION");

};
