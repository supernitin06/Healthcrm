import express from "express";
import { CreateMedicalHistoryController, GetMyMedicalHistoryController, GetMedicalHistoryByIdController, UpdateMedicalHistoryController, DeleteMedicalHistoryController } from "./medical_history.controller.js";
import { authMiddleware } from "../../middlewares/authmiddlewere.js";

const router = express.Router();

router.post("/create",
    /* #swagger.tags = ['MedicalHistory'] */
    authMiddleware, CreateMedicalHistoryController);

router.get("/my-history",
    /* #swagger.tags = ['MedicalHistory'] */
    authMiddleware, GetMyMedicalHistoryController);

router.get("/:id",
    /* #swagger.tags = ['MedicalHistory'] */
    authMiddleware, GetMedicalHistoryByIdController);

router.put("/update/:id",
    /* #swagger.tags = ['MedicalHistory'] */
    authMiddleware, UpdateMedicalHistoryController);

router.delete("/delete/:id",
    /* #swagger.tags = ['MedicalHistory'] */
    authMiddleware, DeleteMedicalHistoryController);

export default router;
