import { body } from "express-validator";

export const createTeamValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Team name is required")
        .isString()
        .withMessage("Team name must be a string"),
];

export const updateTeamValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Team name is required")
        .isString()
        .withMessage("Team name must be a string"),
];
