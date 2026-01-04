import {
    createHealthTest,
    getHealthTests,
    updateHealthTest,
    deleteHealthTest,
    assignHealthTestToUser,
    getUserHealthTests,
    updateUserHealthTestAssignment,
    deleteUserHealthTestAssignment
} from "./health_test.service.js";

// --- CRUD Controllers ---

export const CreateHealthTestController = async (req, res) => {
    try {
        const result = await createHealthTest(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const GetHealthTestsController = async (req, res) => {
    try {
        const result = await getHealthTests();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const UpdateHealthTestController = async (req, res) => {
    try {
        const result = await updateHealthTest(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const DeleteHealthTestController = async (req, res) => {
    try {
        const result = await deleteHealthTest(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// --- Assignment Controllers ---

export const AssignHealthTestController = async (req, res) => {
    try {
        const { user_id, health_test_id } = req.body;
        const result = await assignHealthTestToUser(health_test_id, user_id);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const GetUserHealthTestsController = async (req, res) => {
    try {
        const result = await getUserHealthTests(req.params.userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const UpdateUserHealthTestAssignmentController = async (req, res) => {
    try {
        const { health_test_id } = req.body;
        const result = await updateUserHealthTestAssignment(req.params.id, health_test_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const DeleteUserHealthTestAssignmentController = async (req, res) => {
    try {
        const result = await deleteUserHealthTestAssignment(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
