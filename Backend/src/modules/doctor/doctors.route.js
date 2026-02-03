import express from "express";
import { CreateDoctorController, DeleteDoctorController, DeleteDoctorAppoitmentController, GetDoctorByIdController, GetDoctorsController, TakeDoctorAppoitmentController, UpdateDoctorAppoitmentController, UpdateDoctorController } from "./doctors.controller.js";
import { authMiddleware } from "../../middlewares/authmiddlewere.js";
import { can } from "../../middlewares/Permission.js";
import { createUploader } from "../../middlewares/coloudinary/cloudinary.js";
const router = express.Router();

router.post("/create",
    /* 
        #swagger.tags = ['Doctors']
        #swagger.consumes = ['multipart/form-data']
        #swagger.parameters['name'] = { in: 'formData', required: true, type: 'string' }
        #swagger.parameters['email'] = { in: 'formData', required: true, type: 'string' }
        #swagger.parameters['password'] = { in: 'formData', required: true, type: 'string' }
        #swagger.parameters['phone'] = { in: 'formData', required: true, type: 'string' }
        #swagger.parameters['description'] = { in: 'formData', type: 'string' }
        #swagger.parameters['fee'] = { in: 'formData', required: true, type: 'number' }
        #swagger.parameters['experience'] = { in: 'formData', required: true, type: 'integer' }
        #swagger.parameters['speciality'] = { in: 'formData', required: true, type: 'string' }
        #swagger.parameters['is_active'] = { in: 'formData', type: 'boolean', default: true }
        #swagger.parameters['profile_image'] = {
            in: 'formData',
            type: 'file',
            required: false,
            description: 'Doctor profile image'
        }
    */
    authMiddleware, can("create_doctor"), createUploader("doctor").single("profile_image"), CreateDoctorController);
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
    /* 
        #swagger.tags = ['Doctors_Appoitments']
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            specil_detail: { type: "string", example: "Detailed checkup required" },
                            appoitment_date: { type: "string", format: "date-time", example: "2024-01-01T10:00:00Z" }
                        },
                        required: ["specil_detail", "appoitment_date"]
                    }
                }
            }
        }
    */
    authMiddleware, can("create_doctor_appoitment"), TakeDoctorAppoitmentController);
router.put("/update-appoitment/:id",
    /* #swagger.tags = ['Doctors_Appoitments'] */
    authMiddleware, can("update_doctor_appoitment"), UpdateDoctorAppoitmentController);
router.delete("/delete-appoitment/:id",
    /* #swagger.tags = ['Doctors_Appoitments'] */
    authMiddleware, can("delete_doctor_appoitment"), DeleteDoctorAppoitmentController);


export default router;
