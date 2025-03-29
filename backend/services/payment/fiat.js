// backend/services/payment/fiat.js
/**
 * This file simulates processing a fiat payment.
 * In a real application, you would integrate with services like Stripe, PayPal, etc.
 */

export const processFiatPayment = async (paymentDetails) => {
  // Simulate payment processing delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    success: true,
    transactionId: "fiat_tx_987654",
    details: paymentDetails,
  };
};
