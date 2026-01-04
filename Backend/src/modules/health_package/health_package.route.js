import { Router } from "express";
import { authMiddleware } from "../../middlewares/authmiddlewere.js";
import { can } from "../../middlewares/Permission.js";
import {
    CreateHealthPackageController,
    GetHealthPackagesController,
    GetHealthPackageByIdController,
    UpdateHealthPackageController,
    DeleteHealthPackageController,
    AddTestToPackageController,
    RemoveTestFromPackageController,
    AssignPackageController,
    GetUserPackagesController,
    DeleteUserPackageAssignmentController
} from "./health_package.controller.js";

const router = Router();

// --- Health Package CRUD Routes ---

router.post("/create",
    /* #swagger.tags = ['HealthPackages'] */
    can("create health_package"),
    authMiddleware, CreateHealthPackageController);

router.get("/get",
    /* #swagger.tags = ['HealthPackages'] */
    can("get health_package"),
    authMiddleware, GetHealthPackagesController);

router.get("/get/:id",
    /* #swagger.tags = ['HealthPackages'] */
    can("get health_package"),
    authMiddleware, GetHealthPackageByIdController);

router.put("/update/:id",
    /* #swagger.tags = ['HealthPackages'] */
    can("update health_package"),
    authMiddleware, UpdateHealthPackageController);

router.delete("/delete/:id",
    /* #swagger.tags = ['HealthPackages'] */
    can("delete health_package"),
    authMiddleware, DeleteHealthPackageController);

// --- Package Content Routes ---

router.post("/:id/add-test",
    /* #swagger.tags = ['HealthPackages'] */
    /* #swagger.summary = 'Add a Health Test to a Health Package' */
    can("update health_package"),
    authMiddleware, AddTestToPackageController);

router.post("/:id/remove-test",
    /* #swagger.tags = ['HealthPackages'] */
    /* #swagger.summary = 'Remove a Health Test from a Health Package' */
    can("update health_package"),
    authMiddleware, RemoveTestFromPackageController);

// --- Assignment Routes ---

router.post("/assign",
    /* #swagger.tags = ['UserHealthPackages'] */
    can("assign health_package"),
    authMiddleware, AssignPackageController);

router.get("/assigned/:userId",
    /* #swagger.tags = ['UserHealthPackages'] */
    can("get assigned_health_package"),
    authMiddleware, GetUserPackagesController);

router.delete("/assigned/delete/:id",
    /* #swagger.tags = ['UserHealthPackages'] */
    can("delete assigned_health_package"),
    authMiddleware, DeleteUserPackageAssignmentController);

export default router;
