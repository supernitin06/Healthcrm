import { assignPermissionToRole } from "./assignpermissionToRole.js";


export const seedRolePermissions = async () => {

    await assignPermissionToRole("superadmin", "CREATE_STAFF");
    await assignPermissionToRole("superadmin", "DELETE_STAFF");
    await assignPermissionToRole("superadmin", "UPDATE_STAFF");
    await assignPermissionToRole("superadmin", "GET_STAFF");
    await assignPermissionToRole("superadmin", "CREATE_PLAN");
    await assignPermissionToRole("superadmin", "UPDATE_PLAN");
    await assignPermissionToRole("superadmin", "DELETE_PLAN");
    await assignPermissionToRole("superadmin", "CREATE_TEAM");
    await assignPermissionToRole("superadmin", "DELETE_TEAM");
    await assignPermissionToRole("superadmin", "VIEW_TEAMS");
    // ADMIN
    await assignPermissionToRole("admin", "CREATE_STAFF");
    await assignPermissionToRole("admin", "VIEW_USERS");

    // STAFF (example)
    await assignPermissionToRole("staff", "VIEW_USERS");

    await assignPermissionToRole("superadmin", "CREATE_PERMISSION");
    await assignPermissionToRole("superadmin", "DELETE_PERMISSION");
    await assignPermissionToRole("superadmin", "UPDATE_PERMISSION");
    await assignPermissionToRole("superadmin", "ASSIGN_PERMISSION");
    await assignPermissionToRole("superadmin", "REMOVE_PERMISSION");
    
};
