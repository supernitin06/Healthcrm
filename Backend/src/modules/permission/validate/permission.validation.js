import { body } from "express-validator";

export const assignPermissionValidation = [
    body("role_id")
        .notEmpty()
        .withMessage("Role ID is required")
        .isString()
        .withMessage("Role ID must be a string"),
    body("permission_id")
        .notEmpty()
        .withMessage("Permission ID is required")
        .isString()
        .withMessage("Permission ID must be a string"),
];
