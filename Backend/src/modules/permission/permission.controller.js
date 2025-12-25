import {
    getPermissionsService,
    getPermissionByIdService,
    assignPermissionToRoleService,
    removePermissionFromRoleService,
    getPermissionsByRoleService,
} from "./permission.service.js";


export const getPermissionsController = async (req, res) => {
    try {
        const permissions = await getPermissionsService();
        res.status(200).json(permissions);
    } catch (error) {
        console.error("Error fetching permissions:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getPermissionByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const permission = await getPermissionByIdService(id);
        if (!permission) {
            return res.status(404).json({ error: "Permission not found" });
        }
        res.status(200).json(permission);
    } catch (error) {
        console.error("Error fetching permission:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}




export const assignPermissionController = async (req, res) => {
    try {
        const { role_id, permission_id } = req.body;
        const assignment = await assignPermissionToRoleService(role_id, permission_id);
        res.status(201).json({ message: "Permission assigned to role successfully", assignment });
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ error: "Permission already assigned to this role" });
        }
        console.error("Error assigning permission:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const removePermissionController = async (req, res) => {
    try {
        const { role_id, permission_id } = req.body; // Or params if preferred, but body is clearer for relation removal often
        const removal = await removePermissionFromRoleService(role_id, permission_id);
        if (!removal) {
            return res.status(404).json({ error: "Assignment not found" });
        }
        res.status(200).json({ message: "Permission removed from role successfully" });
    } catch (error) {
        console.error("Error removing permission:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getRolePermissionsController = async (req, res) => {
    try {
        const { roleId } = req.params;
        const permissions = await getPermissionsByRoleService(roleId);
        res.status(200).json(permissions);
    } catch (error) {
        console.error("Error getting role permissions:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
