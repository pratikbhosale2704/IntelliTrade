import { ethers } from "../../JS/ethers-6.7.esm.min.js";
import { abi, contractAddress } from "../../JS/constants.js";
console.log("app.js is successfully loaded!");

// Get references to HTML elements
const getDetailsButton = document.getElementById("getDetailsButton");
const detailsOutput = document.getElementById("detailsOutput");
const details = document.getElementById("details");

// Add event listener for the button
getDetailsButton.addEventListener("click", getCreditDetails);

async function getCreditDetails() {
    const creditIdInput = document.getElementById("detailscreditid");
    const creditId = creditIdInput.value.trim(); // Get user input and trim spaces

    // Validate input
    if (!creditId) {
        alert("Credit ID is required to view details.");
        return;
    }

    if (typeof window.ethereum === "undefined") {
        alert("MetaMask is not installed. Please install MetaMask.");
        return;
    }

    try {
        // Connect to Ethereum provider
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Fetching credit details for ID:", creditId);

        // Call the smart contract function
        const creditDetails = await contract.getAssetDetails(creditId);
        console.log("Credit details:", creditDetails);

        if (!creditDetails || creditDetails.length === 0) {
            alert("No credit details found.");
            return;
        }

        // Destructure response and convert BigNumbers to strings
        const [id, owner, creditType, quantity, price, expiryDate, isForSale] = creditDetails;
        const expiryDateFormatted = expiryDate ? new Date(Number(expiryDate.toString()) * 1000).toLocaleString() : "Invalid Date";

        // Ensure BigNumbers are displayed correctly
        details.innerHTML = `
            <strong>Credit ID:</strong> ${id.toString()}<br>
            <strong>Owner:</strong> ${owner}<br>
            <strong>Type:</strong> ${creditType}<br>
            <strong>Quantity:</strong> ${quantity.toString()}<br>
            <strong>Price (ETH):</strong> ${(price.toString()) / 10**18} ETH<br>
            <strong>Expiry:</strong> ${expiryDateFormatted}<br>
            <strong>For Sale:</strong> ${isForSale ? "Yes" : "No"}
        `;

        // Show the details section
        detailsOutput.style.display = "block";

    } catch (err) {
        console.error("Error fetching credit details:", err);
        alert("Error fetching details: " + (err.message || "Unknown error"));
    }
}
