import { ethers } from "../../JS/ethers-6.7.esm.min.js";
import { abi, contractAddress } from "../../JS/constants.js";

console.log("script.js is successfully loaded!");

const getCreditsButton = document.getElementById("getCreditsButton");
const ownedCreditsSection = document.getElementById("ownedCreditsSection");
const creditsList = document.getElementById("creditsList");

getCreditsButton.onclick = getOwnedCredits;

async function getOwnedCredits() {
    console.log("Get Owned Credits button clicked");

    if (typeof window.ethereum === "undefined") {
        alert("MetaMask is not installed. Please install MetaMask.");
        return;
    }

    try {
        const provider = new ethers.BrowserProvider(window.ethereum);

        // Check if MetaMask is already connected
        const accounts = await provider.listAccounts();

        if (accounts.length === 0) {
            console.log("MetaMask is not connected. Requesting connection...");
            await provider.send("eth_requestAccounts", []);
        }

        // Get the user's address (first account)
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        console.log("Connected wallet address:", userAddress);

        // Create a contract instance
        const contract = new ethers.Contract(contractAddress, abi, signer);

        // Call the Solidity function `getUserCredits`
        const ownedCredits = await contract.getUserCredits();
        console.log("Owned credits (raw):", ownedCredits);

        // Convert BigInt values to strings and update the UI
        const ownedCreditsAsStrings = ownedCredits.map((credit) => credit.toString());
        console.log("Owned credits (converted):", ownedCreditsAsStrings);

        // Show the owned credits section and display the list
        ownedCreditsSection.style.display = "block"; // Show the section
        creditsList.innerHTML = ""; // Clear previous list

        if (ownedCreditsAsStrings.length === 0) {
            creditsList.innerHTML = "<li>No credits found.</li>";
        } else {
            ownedCreditsAsStrings.forEach((credit) => {
                const li = document.createElement("li");
                li.textContent = `Credit ID: ${credit}`;
                creditsList.appendChild(li);
            });
        }

    } catch (err) {
        console.error("Error fetching credits:", err);
        alert("Error: " + err.message);
    }
}
