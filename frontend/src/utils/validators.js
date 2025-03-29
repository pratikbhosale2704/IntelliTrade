// frontend/src/utils/validators.js

/**
 * isEmailValid - Checks if an email address is in a valid format.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if valid, otherwise false.
 */
export const isEmailValid = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * isPasswordStrong - Checks if a password meets minimum strength criteria.
 * @param {string} password - The password to validate.
 * @returns {boolean} - Returns true if the password is strong enough.
 */
export const isPasswordStrong = (password) => {
  // At least 8 characters, one uppercase letter, one lowercase letter, and one number
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
};

/**
 * validateForm - Validates an object of form fields.
 * @param {Object} fields - An object where keys are field names and values are the input values.
 * @returns {Object} - An object with error messages for each invalid field.
 */
export const validateForm = (fields) => {
  const errors = {};

  if (!fields.email || !isEmailValid(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!fields.password || !isPasswordStrong(fields.password)) {
    errors.password =
      "Password must be at least 8 characters and include uppercase, lowercase, and a number.";
  }
  // Add more field validations as needed

  return errors;
};
