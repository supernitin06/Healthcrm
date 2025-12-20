import { body } from "express-validator";

export const registerValidation = [
    body("username")
        .isString()
        .withMessage("Username must be a string")
        .trim()
        .notEmpty()
        .withMessage("Username is required"),
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];

export const registerStaffValidation = [
    body("username")
        .isString()
        .withMessage("Username must be a string")
        .trim()
        .notEmpty()
        .withMessage("Username is required"),
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    body("role_id")
        .notEmpty()
        .withMessage("Role ID is required")
        .isNumeric()
        .withMessage("Role ID must be numeric"),
];

export const loginValidation = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required"),
];