import { ethers } from "../../JS/ethers-6.7.esm.min.js";
import { abi, contractAddress } from "../../JS/constants.js";

console.log("script.js is successfully loaded!");

const listForSaleButton = document.getElementById("listforsaleButton");
listForSaleButton.onclick = listForSale;


async function listForSale() {
    const creditId = document.getElementById("creditid").value;
    const price = document.getElementById("listprice").value; // This should be in ETH
    const price_in_wei = ethers.parseEther(price); // conversion of ETH into equivalent WEI


    if (!creditId || !price) {
        alert("All fields are required for listing credit.");
        return;
    }

    if (typeof window.ethereum === "undefined") {
        alert("MetaMask is not installed. Please install MetaMask.");
        return;
    }

    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Listing credit for sale:", { creditId, price });
        const transactionResponse = await contract.ListForSale(creditId, price_in_wei);
        console.log("Transaction response:", transactionResponse);
        await transactionResponse.wait(1);
        alert("Credit listed for sale successfully!");
    } catch (err) {
        console.error("Error listing credit:", err);
        alert("Error: " + err.message);
    }
}
