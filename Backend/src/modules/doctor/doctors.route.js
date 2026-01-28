import express from "express";
import { CreateDoctorController, DeleteDoctorController, DeleteDoctorAppoitmentController, GetDoctorByIdController, GetDoctorsController, TakeDoctorAppoitmentController, UpdateDoctorAppoitmentController, UpdateDoctorController } from "./doctors.controller.js";
import { authMiddleware } from "../../middlewares/authmiddlewere.js";
import { can } from "../../middlewares/Permission.js";
const router = express.Router();

router.post("/create",
    /* #swagger.tags = ['Doctors'] */
    authMiddleware, can("create_doctor"), CreateDoctorController);
router.get("/get",
    /* #swagger.tags = ['Doctors'] */
    authMiddleware, can("read_doctor"), GetDoctorsController);
router.get("/get/:id",
    /* #swagger.tags = ['Doctors'] */
    authMiddleware, can("read_doctor"), GetDoctorByIdController);
router.put("/update/:id",
    /* #swagger.tags = ['Doctors'] */
    authMiddleware, can("update_doctor"), UpdateDoctorController);
router.delete("/delete/:id",
    /* #swagger.tags = ['Doctors'] */
    authMiddleware, can("delete_doctor"), DeleteDoctorController);
router.post("/take-appoitment/:id",
    /* #swagger.tags = ['Doctors_Appoitments'] */
    authMiddleware, can("create_doctor_appoitment"), TakeDoctorAppoitmentController);
router.put("/update-appoitment/:id",
    /* #swagger.tags = ['Doctors_Appoitments'] */
    authMiddleware, can("update_doctor_appoitment"), UpdateDoctorAppoitmentController);
router.delete("/delete-appoitment/:id",
    /* #swagger.tags = ['Doctors_Appoitments'] */
    authMiddleware, can("delete_doctor_appoitment"), DeleteDoctorAppoitmentController);


export default router;
