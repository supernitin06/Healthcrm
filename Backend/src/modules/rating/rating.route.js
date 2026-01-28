import express from "express";
import {
    AddDoctorRatingController, GetDoctorRatingsController,
    AddHealthTestRatingController, GetHealthTestRatingsController,
    AddStaffRatingController, GetStaffRatingsController,
    AddInsuranceRatingController, GetInsuranceRatingsController
} from "./rating.controller.js";
import { authMiddleware } from "../../middlewares/authmiddlewere.js";

const router = express.Router();

// Doctor Ratings
router.post("/doctor/:id",
    /* #swagger.tags = ['Ratings'] */
    authMiddleware, AddDoctorRatingController);
router.get("/doctor/:id",
    /* #swagger.tags = ['Ratings'] */
    GetDoctorRatingsController);

// Health Test Ratings
router.post("/health-test/:id",
    /* #swagger.tags = ['Ratings'] */
    authMiddleware, AddHealthTestRatingController);
router.get("/health-test/:id",
    /* #swagger.tags = ['Ratings'] */
    GetHealthTestRatingsController);

// Staff Ratings
router.post("/staff/:id",
    /* #swagger.tags = ['Ratings'] */
    authMiddleware, AddStaffRatingController);
router.get("/staff/:id",
    /* #swagger.tags = ['Ratings'] */
    GetStaffRatingsController);

// Insurance Ratings
router.post("/insurance/:id",
    /* #swagger.tags = ['Ratings'] */
    authMiddleware, AddInsuranceRatingController);
router.get("/insurance/:id",
    /* #swagger.tags = ['Ratings'] */
    GetInsuranceRatingsController);

export default router;
