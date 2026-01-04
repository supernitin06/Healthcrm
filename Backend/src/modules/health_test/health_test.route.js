import { Router } from "express";
import { authMiddleware } from "../../middlewares/authmiddlewere.js";
import { can } from "../../middlewares/Permission.js";
import {
    CreateHealthTestController,
    GetHealthTestsController,
    UpdateHealthTestController,
    DeleteHealthTestController,
    AssignHealthTestController,
    GetUserHealthTestsController,
    UpdateUserHealthTestAssignmentController,
    DeleteUserHealthTestAssignmentController
} from "./health_test.controller.js";

const router = Router();

// --- Health Test CRUD Routes ---

router.post("/create",
    /* #swagger.tags = ['HealthTests'] */
    can("create health_test"),
    authMiddleware, CreateHealthTestController);

router.get("/get",
    /* #swagger.tags = ['HealthTests'] */
    can("get health_test"),
    authMiddleware, GetHealthTestsController);

router.put("/update/:id",
    /* #swagger.tags = ['HealthTests'] */
    can("update health_test"),
    authMiddleware, UpdateHealthTestController);

router.delete("/delete/:id",
    /* #swagger.tags = ['HealthTests'] */
    can("delete health_test"),
    authMiddleware, DeleteHealthTestController);

// --- Assignment Routes ---

router.post("/assign",
    /* #swagger.tags = ['UserHealthTests'] */
    can("assign health_test"),
    authMiddleware, AssignHealthTestController);

router.get("/assigned/:userId",
    /* #swagger.tags = ['UserHealthTests'] */
    can("get assigned_health_test"),
    authMiddleware, GetUserHealthTestsController);

router.put("/assigned/update/:id",
    /* #swagger.tags = ['UserHealthTests'] */
    can("update assigned_health_test"),
    authMiddleware, UpdateUserHealthTestAssignmentController);

router.delete("/assigned/delete/:id",
    /* #swagger.tags = ['UserHealthTests'] */
    can("delete assigned_health_test"),
    authMiddleware, DeleteUserHealthTestAssignmentController);

export default router;
