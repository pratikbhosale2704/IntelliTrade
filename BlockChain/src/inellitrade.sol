// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title A simple Intellitrade Trading Platform Contract
 * @notice This contract creates a platform for trading intellectual properties.
 */
contract IntellitradePlatform is ReentrancyGuard {
    /* Errors */
    error Unauthorized(address caller);
    error OutOfExpiry(uint256 _ExpiryDate);
    error CallerIsNotTheOwner();
    error AssetIsNotForSale();
    error IncorrectETHERisSent();
    error CannotSendMoneyDirectly();
    error theAssetNotFound();
    error InvalidPrice();

    /* Debug event (for troubleshooting only – to be removed in production) */
    event Debug(string message, uint256 value);

    /* Asset structure */
    struct Asset {
        uint256 Id;
        address Owner;
        string AssetType;
        uint256 Price_in_wei; // Price in WEI
        uint256 ExpiryDate;
        bool IsForSale;
    }

    /* State variables */
    address private immutable i_ContractOwner;
    uint private S_AssetCounter; // Unique ID counter for assets.
    mapping(address => uint256[]) private OwnedAssets; // Assets owned by an address.
    mapping(uint256 => Asset) private Id_TO_Assets; // Mapping from asset ID to Asset struct.
    uint256[] private assets_listed_for_sale; // Array of asset IDs listed for sale.

    // New: Mapping to keep track of the number of transactions each user has done.
    mapping(address => uint256) private transactionCounts;

    /* Events */
    event AssetMinted(
        uint256 indexed Id,
        address indexed Owner,
        uint256 Price_in_wei,
        uint256 Expiry,
        string AssetType
    );
    event AssetListedForSale(address Owner, uint256 Id);
    event AssetBought(
        address indexed Seller,
        address indexed Buyer,
        uint256 Price_in_wei,
        uint256 AssetId
    );
    event RemovedAssetFromSale(address Owner, uint256 Id);

    /* Constructor */
    constructor() {
        i_ContractOwner = msg.sender;
    }

    /////////////////////////////////
    ///////* PUBLIC FUNCTIONS *//////
    /////////////////////////////////

    /**
     * @dev Mints a new intellectual property asset.
     * @param _AssetType The type of asset.
     * @param _Price_in_wei The price in wei.
     * @param _Expiry The expiry timestamp.
     */
    function MintAsset(
        string memory _AssetType,
        uint256 _Price_in_wei,
        uint256 _Expiry
    ) public AuthorizedOnly {
        // Increment transaction count for the caller.
        transactionCounts[msg.sender]++;

        if (_Expiry < block.timestamp) {
            revert OutOfExpiry(_Expiry);
        }
        if (_Price_in_wei <= 0) {
            revert InvalidPrice();
        }
        S_AssetCounter++;
        Id_TO_Assets[S_AssetCounter] = Asset(
            S_AssetCounter,
            msg.sender,
            _AssetType,
            _Price_in_wei,
            _Expiry,
            false
        );
        OwnedAssets[msg.sender].push(S_AssetCounter);
        emit AssetMinted(
            S_AssetCounter,
            msg.sender,
            _Price_in_wei,
            _Expiry,
            _AssetType
        );
    }

    modifier AuthorizedOnly() {
        // Add any authorization checks here if needed.
        _;
    }

    /**
     * @dev Lists an asset for sale.
     * @param _Id The asset ID.
     * @param _Price_in_wei The new price in wei.
     */
    function ListForSale(uint256 _Id, uint256 _Price_in_wei) public {
        // Increment transaction count for the caller.
        transactionCounts[msg.sender]++;

        if (S_AssetCounter < _Id) {
            revert theAssetNotFound();
        }
        Asset storage asset = Id_TO_Assets[_Id];
        if (msg.sender != asset.Owner) {
            revert CallerIsNotTheOwner();
        }
        asset.Price_in_wei = _Price_in_wei;
        asset.IsForSale = true;
        emit AssetListedForSale(msg.sender, _Id);
        assets_listed_for_sale.push(_Id);
    }

    /**
     * @dev Lets users buy an asset.
     * @param _AssetId The asset ID to buy.
     */
    function BuyAsset(uint256 _AssetId) public payable nonReentrant {
        // Increment transaction count for the caller (buyer).
        transactionCounts[msg.sender]++;

        // ********** Checks **********
        Asset storage asset = Id_TO_Assets[_AssetId];

        if (!asset.IsForSale) {
            revert AssetIsNotForSale();
        }
        if (asset.ExpiryDate < block.timestamp + 1 days) {
            revert OutOfExpiry(asset.ExpiryDate);
        }
        if (msg.value != asset.Price_in_wei) {
            emit Debug("Sent value (wei)", msg.value);
            revert IncorrectETHERisSent();
        }

        // ********** Effects **********
        address seller = asset.Owner;

        // Transfer ownership to buyer
        asset.Owner = msg.sender;
        asset.IsForSale = false;

        // Remove asset from seller's owned list
        _removeAssetFromOwnedList(seller, asset.Id);
        // Add asset to buyer's owned list
        OwnedAssets[msg.sender].push(asset.Id);

        // ********** Interactions **********
        // Transfer ETH to the seller
        (bool success, ) = seller.call{value: msg.value}("");
        require(success, "Transfer to asset owner failed.");

        emit AssetBought(seller, msg.sender, asset.Price_in_wei, asset.Id);
    }

    /**
     * @dev Removes an asset from sale.
     * @param Id The asset ID.
     */
    function RemoveAssetFromSale(uint256 Id) public {
        // Increment transaction count for the caller.
        transactionCounts[msg.sender]++;

        if (S_AssetCounter < Id) {
            revert theAssetNotFound();
        }
        Asset storage asset = Id_TO_Assets[Id];
        if (asset.Owner != msg.sender) {
            revert CallerIsNotTheOwner();
        }
        asset.IsForSale = false;
        emit RemovedAssetFromSale(asset.Owner, Id);
    }

    /**
     * @dev Internal function to remove an asset from the owner's list.
     * @param owner The owner address.
     * @param assetId The asset ID.
     */
    function _removeAssetFromOwnedList(
        address owner,
        uint256 assetId
    ) internal {
        uint256[] storage assets = OwnedAssets[owner];
        bool isFound = false;
        for (uint256 i = 0; i < assets.length; i++) {
            if (assets[i] == assetId) {
                assets[i] = assets[assets.length - 1];
                assets.pop();
                isFound = true;
                break;
            }
        }
        if (!isFound) {
            revert theAssetNotFound();
        }
    }

    /**
     * @dev Returns the details of an asset.
     * @param _AssetId The asset ID.
     */
    function getAssetDetails(
        uint256 _AssetId
    )
        public
        view
        returns (
            uint256 Id,
            address Owner,
            string memory AssetType,
            uint256 Price,
            uint256 ExpiryDate,
            bool IsForSale
        )
    {
        Asset storage asset = Id_TO_Assets[_AssetId];
        if (asset.Id == 0) {
            revert theAssetNotFound();
        }
        return (
            asset.Id,
            asset.Owner,
            asset.AssetType,
            asset.Price_in_wei,
            asset.ExpiryDate,
            asset.IsForSale
        );
    }

    /**
     * @dev Returns the asset IDs owned by the caller.
     */
    function getUserAssets() public view returns (uint[] memory) {
        return OwnedAssets[msg.sender];
    }

    /**
     * @dev Returns the list of asset IDs listed for sale.
     */
    function getAssetsListedForSale() external view returns (uint256[] memory) {
        return assets_listed_for_sale;
    }

    /**
     * @dev Returns the number of transactions initiated by a user.
     * @param user The address of the user.
     */
    function getTransactionCount(address user) public view returns (uint256) {
        return transactionCounts[user];
    }

    function getLatestAssetID() public view returns (uint256) {
        return S_AssetCounter;
    }

    /**
     * @dev Fallback and receive functions to prevent direct ETH transfers.
     */
    receive() external payable {
        revert CannotSendMoneyDirectly();
    }

    fallback() external payable {
        revert CannotSendMoneyDirectly();
    }
}
