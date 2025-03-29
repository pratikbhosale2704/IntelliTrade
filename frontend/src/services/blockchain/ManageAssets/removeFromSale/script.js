import { ethers } from "../../ethers-6.7.esm.min.js";
import { abi, contractAddress } from "../../main/constants.js";

console.log("script.js is successfully loaded!");

const removeButton = document.getElementById("removebtn");

removeButton.onclick = removefromsale;

async function removefromsale() {
  const creditId = document.getElementById("creditId").value;

  if (!creditId) {
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

    console.log("Removing credit from sale:", { creditId });
    const transactionResponse = await contract.RemoveAssetFromSale(creditId);
    console.log("Transaction response:", transactionResponse);
    await transactionResponse.wait(1);
    alert("Credit Removed from sale successfully!");
  } catch (err) {
    console.error("Error listing credit:", err);
    alert("Error: " + err.message);
  }
}
