import e from "express";
import { createDoctorService, DeleteAppoitmentService, deleteDoctorService, getDoctorByIdService, getDoctorsService, TakeDoctorAppoitmentService, updateDoctorAppoitmentService, updateDoctorService } from "./doctors.services.js";


export const CreateDoctorController = async (req, res) => {
    try {
        const profile_image = req.file?.path || null;
        const doctor = await createDoctorService({ ...req.body, profile_image }, req.user);
        res.status(201).json(doctor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const GetDoctorsController = async (req, res) => {
    try {
        const doctors = await getDoctorsService();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const GetDoctorByIdController = async (req, res) => {
    try {
        const doctor = await getDoctorByIdService(req.params.id);
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const UpdateDoctorController = async (req, res) => {
    try {
        const doctor = await updateDoctorService(req.params.id, req.body);
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const DeleteDoctorController = async (req, res) => {
    try {
        const doctor = await deleteDoctorService(req.params.id);
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const TakeDoctorAppoitmentController = async (req, res) => {
    try {
        const { specil_detail, appoitment_date } = req.body;
        const patientId = req.user.id;
        const doctor = await TakeDoctorAppoitmentService(req.params.id, patientId, specil_detail, appoitment_date);
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const UpdateDoctorAppoitmentController = async (req, res) => {
    try {
        const { specil_detail, appoitment_date } = req.body;
        const patientId = req.user.id;
        const doctor = await updateDoctorAppoitmentService(req.params.id, patientId, specil_detail, appoitment_date);
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const DeleteDoctorAppoitmentController = async (req, res) => {
    try {
        const patientId = req.user.id;
        const doctor = await DeleteAppoitmentService(req.params.id, patientId);
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
