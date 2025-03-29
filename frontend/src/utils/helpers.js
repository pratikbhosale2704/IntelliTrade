// frontend/src/utils/helpers.js

/**
 * formatDate - Formats a Date object or date string into a readable format.
 * @param {Date|string} dateInput - The date to format.
 * @returns {string} - Formatted date string (e.g., "March 28, 2025").
 */
export const formatDate = (dateInput) => {
  const date = new Date(dateInput);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

/**
 * formatCurrency - Formats a number into a currency string.
 * @param {number} amount - The numeric amount to format.
 * @param {string} locale - Locale for formatting (default is 'en-US').
 * @param {string} currency - Currency code (default is 'USD').
 * @returns {string} - Formatted currency string (e.g., "$1,000.00").
 */
export const formatCurrency = (amount, locale = "en-US", currency = "USD") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
};

/**
 * truncateText - Truncates a string to a specified length, adding ellipsis if needed.
 * @param {string} text - The text to truncate.
 * @param {number} maxLength - Maximum length of the truncated text.
 * @returns {string} - Truncated text.
 */
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};
