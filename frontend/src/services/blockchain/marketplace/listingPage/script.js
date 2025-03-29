import { ethers } from "../../JS/ethers-6.7.esm.min.js";
import { abi, contractAddress } from "../../JS/constants.js";

console.log("script.js is loaded!");
console.log("Checking contract details:", contractAddress, abi);

let cred_id;

async function fetchAndDisplayCredits() {
    if (!window.ethereum) {
        alert("MetaMask is required!");
        return;
    }

    try {
        // Connect to MetaMask
        const provider = new ethers.BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const signer = await provider.getSigner();

        // Connect to the contract
        const contract = new ethers.Contract(contractAddress, abi, signer);

        // Fetch list of credits for sale
        const creditIds = await contract.getcreditslistedforsale();
        console.log("Credit IDs fetched:", creditIds); // Log fetched IDs

        const creditsList = document.getElementById("creditsList");
        creditsList.innerHTML = "";

        // Loop through each credit ID and fetch details
        for (let i = 0; i < creditIds.length; i++) {
            const creditId = Number(creditIds[i]); // Convert BigInt to Number
            console.log(`Fetching details for Credit ID: ${creditId}`); // Log current ID

            const credit = await contract.getCreditDetails(creditId);
            console.log(`Credit details for ID ${creditId}:`, credit); // Log fetched details

            // Ensure that the returned value has the expected length
            if (credit.length < 7) {
                console.error(`Unexpected data format for Credit ID ${creditId}`);
                continue; // Skip this iteration if data format is unexpected
            }

            // Ensure all values are properly converted from BigInt
            const owner = credit[1];
            const type = credit[2];
            const quantity = Number(credit[3]); // Convert BigInt to Number
            const priceETH = Number(credit[4]) / 10 ** 18; // Convert from wei to ETH
            const expiryDate = new Date(Number(credit[5]) * 1000).toLocaleDateString(); // Convert BigInt timestamp
            const forSale = credit[6] ? "Yes" : "No";

            // Create list item
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>Credit ID:</strong> ${creditId} <br>
                <strong>Owner:</strong> ${owner} <br>
                <strong>Type:</strong> ${type} <br>
                <strong>Quantity:</strong> ${quantity} <br>
                <strong>Price in ETH:</strong> ${priceETH} <br>
                <strong>Expiry Date:</strong> ${expiryDate} <br>
                <strong>For Sale:</strong> ${forSale} <br>
                <button onclick="buyNow(${creditId})">Buy Now</button>
                <hr>
            `;
            creditsList.appendChild(li);
            cred_id = creditId; // Store the last credit ID for use elsewhere
        }

    } catch (error) {
        console.error("Error fetching credits:", error);
        alert("Failed to fetch credits. Check console for details.");
    }
}



// Redirect to buy page with credit ID
window.buyNow = function (creditId) {
    window.location.href = `buy.html?creditId=${creditId}`;
};

// Fetch and display credits when the page loads
window.addEventListener("load", fetchAndDisplayCredits);

export const credit_id = cred_id;