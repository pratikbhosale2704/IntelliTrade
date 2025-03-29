export const contractAddress = "0xc126A7C971cC9730244089160Ae4Ab563B9Ca150";
export const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AssetIsNotForSale",
    type: "error",
  },
  {
    inputs: [],
    name: "CallerIsNotTheOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "CannotSendMoneyDirectly",
    type: "error",
  },
  {
    inputs: [],
    name: "IncorrectETHERisSent",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidPrice",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_ExpiryDate",
        type: "uint256",
      },
    ],
    name: "OutOfExpiry",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "Unauthorized",
    type: "error",
  },
  {
    inputs: [],
    name: "theAssetNotFound",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "Seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "Buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "Price_in_wei",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "AssetId",
        type: "uint256",
      },
    ],
    name: "AssetBought",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "Owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "Id",
        type: "uint256",
      },
    ],
    name: "AssetListedForSale",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "Id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "Owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "Price_in_wei",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "Expiry",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "AssetType",
        type: "string",
      },
    ],
    name: "AssetMinted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Debug",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "Owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "Id",
        type: "uint256",
      },
    ],
    name: "RemovedAssetFromSale",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_AssetId",
        type: "uint256",
      },
    ],
    name: "BuyAsset",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_Id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_Price_in_wei",
        type: "uint256",
      },
    ],
    name: "ListForSale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_AssetType",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_Price_in_wei",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_Expiry",
        type: "uint256",
      },
    ],
    name: "MintAsset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "Id",
        type: "uint256",
      },
    ],
    name: "RemoveAssetFromSale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_AssetId",
        type: "uint256",
      },
    ],
    name: "getAssetDetails",
    outputs: [
      {
        internalType: "uint256",
        name: "Id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "Owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "AssetType",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "Price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "ExpiryDate",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "IsForSale",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAssetsListedForSale",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLatestAssetID",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getTransactionCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUserAssets",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];
