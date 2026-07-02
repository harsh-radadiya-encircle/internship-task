const { body } = require("express-validator");

exports.commentValidation = [
    body("content")
        .trim()
        .notEmpty()
        .withMessage("Comment content is required.")
        .isLength({ min: 1 })
        .withMessage("Comment content must be at least 1 character long."),
];
