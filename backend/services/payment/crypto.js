// backend/services/payment/crypto.js
/**
 * This file simulates processing a crypto payment.
 * In a real application, you might integrate with a crypto payment gateway or blockchain transaction.
 */

export const processCryptoPayment = async (paymentDetails) => {
  // Simulate payment processing delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    success: true,
    transactionId: "crypto_tx_123456",
    details: paymentDetails,
  };
};
