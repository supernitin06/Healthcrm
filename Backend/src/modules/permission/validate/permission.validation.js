import { body } from "express-validator";

export const assignPermissionValidation = [
    body("role_id")
        .notEmpty()
        .withMessage("Role ID is required")
        .isNumeric()
        .withMessage("Role ID must be numeric"),
    body("permission_id")
        .notEmpty()
        .withMessage("Permission ID is required")
        .isNumeric()
        .withMessage("Permission ID must be numeric"),
];
