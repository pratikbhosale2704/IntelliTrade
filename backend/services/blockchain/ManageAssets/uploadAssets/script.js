import { ethers } from "../../main/ethers-6.7.esm.min.js";
import { abi, contractAddress } from "../../main/constants.js";

console.log("script.js is successfully loaded!");

const mintButton = document.getElementById("mintButton");
mintButton.onclick = mint;

async function mint() {
    console.log("Mint button clicked");
    const creditType = document.getElementById("credittype").value;
    const quantity = document.getElementById("quantity").value;
    const price = document.getElementById("price").value; // This should be in ETH
    const expiryDate = document.getElementById("expiry").value;

    if (!creditType || !quantity || !price || !expiryDate) {
        alert("All fields are required for minting credit.");
        return;
    }

    if (typeof window.ethereum === "undefined") {
        alert("MetaMask is not installed. Please install MetaMask.");
        return;
    }

    try {
        // Convert the expiry date to a Unix timestamp
        const expiryTimestamp = Math.floor(new Date(expiryDate).getTime() / 1000);

        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        // Convert price from ETH to wei
        const priceWei = ethers.parseEther(price); // Converts ETH value to wei

        console.log("Minting credit:", { creditType, quantity, price: priceWei.toString(), expiry: expiryTimestamp });
        const transactionResponse = await contract.MintAsset(
            creditType,
            priceWei, // Send the converted value
            expiryTimestamp
        );

        console.log("Transaction response:", transactionResponse);
        await transactionResponse.wait(1);
        alert("Credit minted successfully!");
    } catch (err) {
        console.error("Error minting credit:", err);
        alert("Error: " + err.message);
    }
}
