import { createMedicalHistoryService, getMedicalHistoryByUserService, getMedicalHistoryByIdService, updateMedicalHistoryService, deleteMedicalHistoryService } from "./medical_history.service.js";

export const CreateMedicalHistoryController = async (req, res) => {
    try {
        const { category, title, details, doctor_id, recorded_date } = req.body;
        const data = { category, title, details, doctor_id, recorded_date };
        const history = await createMedicalHistoryService(req.user.id, data);
        res.status(201).json(history);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const GetMyMedicalHistoryController = async (req, res) => {
    try {
        const history = await getMedicalHistoryByUserService(req.user.id);
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const GetMedicalHistoryByIdController = async (req, res) => {
    try {
        const history = await getMedicalHistoryByIdService(req.params.id);
        if (!history) return res.status(404).json({ message: "Record not found" });
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const UpdateMedicalHistoryController = async (req, res) => {
    try {
        const { category, title, details, doctor_id, recorded_date } = req.body;
        const data = { category, title, details, doctor_id, recorded_date };
        const history = await updateMedicalHistoryService(req.params.id, data);
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const DeleteMedicalHistoryController = async (req, res) => {
    try {
        const history = await deleteMedicalHistoryService(req.params.id);
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
