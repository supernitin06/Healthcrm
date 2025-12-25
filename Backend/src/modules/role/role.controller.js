import {
    createRoleService,
    getRolesService,
    getRoleByIdService,
    updateRoleService,
    deleteRoleService,
} from "./role.service.js";


// Create a new role
// Create a new role
// Create a new role

export const createRoleController = async (req, res) => {
    try {
        const { name } = req.body;
        const role = await createRoleService(name);
        res.status(201).json({ message: "Role created successfully", role });
    } catch (error) {
        if (error.code === '23505') { // Unique constraint violation
            return res.status(409).json({ error: "Role already exists" });
        }
        console.error("Error creating role:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getRolesController = async (req, res) => {
    try {
        const roles = await getRolesService();
        res.status(200).json(roles);
    } catch (error) {
        console.error("Error fetching roles:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getRoleByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await getRoleByIdService(id);
        if (!role) {
            return res.status(404).json({ error: "Role not found" });
        }
        res.status(200).json(role);
    } catch (error) {
        console.error("Error fetching role:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateRoleController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const role = await updateRoleService(id, name);
        if (!role) {
            return res.status(404).json({ error: "Role not found" });
        }
        res.status(200).json({ message: "Role updated successfully", role });
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ error: "Role name already exists" });
        }
        console.error("Error updating role:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteRoleController = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await deleteRoleService(id);
        if (!role) {
            return res.status(404).json({ error: "Role not found" });
        }
        res.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
        console.error("Error deleting role:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
