import { body } from "express-validator";

export const createRoleValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Role name is required")
        .isString()
        .withMessage("Role name must be a string"),
];

export const updateRoleValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Role name is required")
        .isString()
        .withMessage("Role name must be a string"),
];
