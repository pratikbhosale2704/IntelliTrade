// backend/utils/notification.js
/**
 * sendNotification - Dummy function to send a notification.
 *
 * @param {string} recipient - The email or identifier of the recipient.
 * @param {string} message - The notification message to send.
 *
 * @returns {Promise<Object>} - A promise that resolves to a success status.
 */
export const sendNotification = async (recipient, message) => {
  // Simulate asynchronous notification sending with a delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // For demonstration, we log the notification to the console.
  console.log(`Notification sent to ${recipient}: ${message}`);

  // Return a dummy success status.
  return { success: true, recipient, message };
};
