import { ethers } from "../../JS/ethers-6.7.esm.min.js";
import { abi, contractAddress } from "../../JS/constants.js";

console.log("buy.js is loaded!");

// Get credit ID from URL
const urlParams = new URLSearchParams(window.location.search);
const creditId = urlParams.get("creditId");

if (!creditId) {
  alert("No credit ID found!");
} else {
  console.log("Selected Credit ID:", creditId);
  initializePurchase();
}

let credit;
let currentUser;

async function initializePurchase() {
  if (!window.ethereum) {
    alert("MetaMask is required!");
    return;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    currentUser = await provider.getSigner();
    await fetchCreditDetails();
    setupUI();
  } catch (error) {
    console.error("Initialization error:", error);
    alert("Failed to initialize purchase: " + error.message);
  }
}

async function fetchCreditDetails() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, abi, provider);

  // Debug: Log contract address
  console.log("Contract Address:", contractAddress);

  try {
    credit = await contract.getAssetDetails(creditId);

    // Update the page with credit details
    document.getElementById("creditDetails").innerHTML = `
      <strong>Credit ID:</strong> ${credit[0]} <br>
      <strong>Owner:</strong> ${credit[1]} <br>
      <strong>Type:</strong> ${credit[2]} <br>
      <strong>Quantity:</strong> ${credit[3].toString()} <br>
      <strong>Price (ETH):</strong> ${ethers.formatEther(credit[4])} <br>
      <strong>Expiry Date:</strong> ${new Date(
        Number(credit[5]) * 1000
      ).toLocaleDateString()} <br>
      <strong>For Sale:</strong> ${credit[6] ? "Yes" : "No"} <br>
    `;

    // Set the maximum allowed quantity in the input
    document.getElementById("buyQuantity").max = Number(credit[3]);
  } catch (error) {
    console.error("Error fetching credit details:", error);
    alert("Failed to fetch credit details.");
  }
}

function setupUI() {
  document.getElementById("buyQuantity").addEventListener("input", function () {
    const inputValue = Number(this.value);
    const maxQuantity = Number(credit[3]);

    // Ensure quantity is within valid range
    const quantity = Math.min(Math.max(inputValue, 1), maxQuantity);
    this.value = quantity.toString();

    const pricePer = Number(ethers.formatEther(credit[4]));
    document.getElementById("totalPrice").value = (quantity * pricePer).toFixed(
      6
    );
  });

  document.getElementById("confirmBuy").addEventListener("click", async () => {
    try {
      await validatePurchase();
      await executePurchase();
    } catch (error) {
      console.error("Purchase error:", error);
      alert(error.message || "Purchase failed");
    }
  });
}

async function validatePurchase() {
  if (!credit[6]) throw new Error("Credit is not for sale");
  if (await isExpired()) throw new Error("Credit expires too soon");
  if (await isSelfPurchase()) throw new Error("Cannot buy your own credit");

  const quantity = parseInt(document.getElementById("buyQuantity").value);
  if (!quantity || quantity < 1 || quantity > Number(credit[3])) {
    throw new Error(`Invalid quantity (1-${credit[3].toString()})`);
  }
}

async function isExpired() {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  return Number(credit[5]) < currentTimestamp + 86400;
}

async function isSelfPurchase() {
  const ownerAddress = credit[1].toLowerCase();
  const userAddress = (await currentUser.getAddress()).toLowerCase();
  return ownerAddress === userAddress;
}

async function executePurchase() {
  const contract = new ethers.Contract(contractAddress, abi, currentUser);

  // Check that the BuyCredit function exists on the contract instance
  if (!contract || typeof contract.BuyAsset !== "function") {
    console.error("Contract instance or BuyCredit function is undefined.");
    alert("Contract instance could not be created.");
    return;
  }

  const quantity = parseInt(document.getElementById("buyQuantity").value);
  const totalValue = BigInt(quantity) * credit[4];

  try {
    // Directly execute the transaction (without callStatic simulation)
    const tx = await contract.BuyAsset(quantity, creditId, {
      value: totalValue,
      gasLimit: 300000, // Adjust gas limit if necessary
    });

    await tx.wait();
    alert("Purchase successful!");
    window.location.reload();
  } catch (error) {
    if (error.data) {
      try {
        const decodedError = contract.interface.parseError(error.data);
        throw new Error(decodedError?.args?.toString() || decodedError?.name);
      } catch {
        throw new Error("Contract error: Unknown reason");
      }
    }
    throw error;
  }
}
