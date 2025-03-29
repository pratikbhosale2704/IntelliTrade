// backend/utils/ipVerification.js
/**
 * verifyIPAsset - Dummy function to verify an IP asset.
 *
 * @param {Object} ipAsset - An object representing the IP asset.
 *   Expected properties: title (string), description (string), etc.
 *
 * @returns {Promise<Object>} - A promise that resolves to an object containing
 *   the verification status and details.
 */
export const verifyIPAsset = async (ipAsset) => {
  // Simulate asynchronous verification with a delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Dummy logic: if the title contains the word "Verified" (case-insensitive), mark it as verified.
  const isVerified =
    ipAsset.title && ipAsset.title.toLowerCase().includes("verified");

  return {
    status: isVerified ? "Verified" : "Pending",
    details: isVerified
      ? "IP asset is verified via public registry."
      : "IP asset verification is pending. Please re-check later.",
  };
};
