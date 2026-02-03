import { assignInsuranceToUser, createInsurance, deleteAssignInsuranceToUser, deleteInsurance, getAssignInsuranceToUser, getInsurance, updateInsurance } from "./insaurance.service.js";


export const createInsuranceController = async (req, res) => {
    try {
        const insurance = await createInsurance(req.body);
        res.status(201).json(insurance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const assignInsuranceToUserController = async (req, res) => {
    try {
        const { insurance_id, user_id } = req.body;
        if (!insurance_id || !user_id) {
            return res.status(400).json({ error: "insurance_id and user_id are required" });
        }
        const insurance = await assignInsuranceToUser(insurance_id, user_id);
        res.status(201).json(insurance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAssignInsuranceToUserController = async (req, res) => {
    try {
        const insurance = await getAssignInsuranceToUser(req.params.id);
        res.status(200).json(insurance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteAssignInsuranceToUserController = async (req, res) => {
    try {
        const insurance = await deleteAssignInsuranceToUser(req.params.id);
        res.status(200).json(insurance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getInsuranceController = async (req, res) => {
    try {
        const insurance = await getInsurance();
        res.status(200).json(insurance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteInsuranceController = async (req, res) => {
    try {
        const insurance = await deleteInsurance(req.params.id);
        res.status(200).json(insurance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateInsuranceController = async (req, res) => {
    try {
        const insurance = await updateInsurance(req.body);
        res.status(200).json(insurance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
