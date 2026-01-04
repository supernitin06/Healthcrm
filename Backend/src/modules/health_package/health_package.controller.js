import {
    createHealthPackage,
    getHealthPackages,
    getHealthPackageById,
    updateHealthPackage,
    deleteHealthPackage,
    addTestToPackage,
    removeTestFromPackage,
    assignPackageToUser,
    getUserPackages,
    deleteUserPackageAssignment
} from "./health_package.service.js";

// --- CRUD Controllers ---

export const CreateHealthPackageController = async (req, res) => {
    try {
        const result = await createHealthPackage(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const GetHealthPackagesController = async (req, res) => {
    try {
        const result = await getHealthPackages();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const GetHealthPackageByIdController = async (req, res) => {
    try {
        const result = await getHealthPackageById(req.params.id);
        if (!result) return res.status(404).json({ error: "Package not found" });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const UpdateHealthPackageController = async (req, res) => {
    try {
        const result = await updateHealthPackage(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const DeleteHealthPackageController = async (req, res) => {
    try {
        const result = await deleteHealthPackage(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// --- Package Content Controllers ---

export const AddTestToPackageController = async (req, res) => {
    try {
        const { health_test_id } = req.body;
        const result = await addTestToPackage(req.params.id, health_test_id);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const RemoveTestFromPackageController = async (req, res) => {
    try {
        const { health_test_id } = req.body;
        const result = await removeTestFromPackage(req.params.id, health_test_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// --- Assignment Controllers ---

export const AssignPackageController = async (req, res) => {
    try {
        const { user_id, package_id } = req.body;
        const result = await assignPackageToUser(package_id, user_id);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const GetUserPackagesController = async (req, res) => {
    try {
        const result = await getUserPackages(req.params.userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const DeleteUserPackageAssignmentController = async (req, res) => {
    try {
        const result = await deleteUserPackageAssignment(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
