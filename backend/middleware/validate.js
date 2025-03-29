// backend/middleware/validate.js
import { validationResult } from "express-validator";

const validate = (req, res, next) => {
  // Extract the validation errors from the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Map the errors into an object where keys are field names
    const extractedErrors = {};
    errors.array().forEach((err) => {
      extractedErrors[err.param] = err.msg;
    });
    return res.status(422).json({ errors: extractedErrors });
  }
  // No validation errors, proceed to the next middleware
  next();
};

export default validate;
