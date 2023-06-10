const { body, validationResult } = require('express-validator'); //npm i express-validator


// Middleware for validating and sanitizing user input
const registerInputValidation = [
    body('f_name')
        .isLength({ min: 2 })
        .withMessage('Username must be at least 2 characters long')
        .trim()
        .escape(),

    body('l_name')
        .isLength({ min: 2 })
        .withMessage('Username must be at least 2 characters long')
        .trim()
        .escape(),

    body('email')
        .isEmail()
        .withMessage('Invalid email address')
        .normalizeEmail(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];






module.exports = {
    registerInputValidation: registerInputValidation
}