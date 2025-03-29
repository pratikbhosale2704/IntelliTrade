// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/inellitrade.sol";

contract IntellitradePlatformTest is Test {
    IntellitradePlatform platform;
    address user = address(0x123);
    address buyer = address(0x456);
    address other = address(0x789);

    function setUp() public {
        // Deploy a fresh instance of the IntellitradePlatform for each test
        platform = new IntellitradePlatform();
    }

    function testMintAsset() public {
        vm.prank(user);
        platform.MintAsset("IP", 1 ether, block.timestamp + 1 days);

        vm.prank(user);
        uint256[] memory assets = platform.getUserAssets();
        assertEq(assets.length, 1, "User should own 1 asset");

        (
            uint256 id,
            address assetOwner,
            string memory assetType,
            uint256 price,
            uint256 expiry,
            bool isForSale
        ) = platform.getAssetDetails(assets[0]);

        assertEq(id, 1, "Asset ID should be 1");
        assertEq(assetOwner, user, "Asset owner should be user");
        assertEq(
            keccak256(abi.encodePacked(assetType)),
            keccak256(abi.encodePacked("IP")),
            "Asset type should be IP"
        );
        assertEq(price, 1 ether, "Price should be 1 ether");
        assertEq(expiry, block.timestamp + 1 days, "Expiry should be in 1 day");
        assertEq(isForSale, false, "Asset should not be for sale");
    }

    function testMintAssetRevertIfInvalidPrice() public {
        vm.prank(user);
        vm.expectRevert(IntellitradePlatform.InvalidPrice.selector);
        platform.MintAsset("IP", 0, block.timestamp + 30 days);
    }

    function testMintAssetRevertIfExpired() public {
        // Use a past expiry value
        uint256 pastExpiry = block.timestamp - 1;
        vm.prank(user);
        vm.expectRevert(
            abi.encodeWithSelector(
                IntellitradePlatform.OutOfExpiry.selector,
                pastExpiry
            )
        );
        platform.MintAsset("IP", 1 ether, pastExpiry);
    }

    function testListForSale() public {
        vm.prank(user);
        platform.MintAsset("IP", 1 ether, block.timestamp + 30 days);

        vm.prank(user);
        platform.ListForSale(1, 2 ether);

        (, , , uint256 price, , bool isForSale) = platform.getAssetDetails(1);
        assertEq(price, 2 ether, "Price should be updated to 2 ether");
        assertEq(isForSale, true, "Asset should be listed for sale");
    }

    function testListForSaleRevertIfInvalidId() public {
        vm.prank(user);
        vm.expectRevert(IntellitradePlatform.theAssetNotFound.selector);
        platform.ListForSale(999, 1 ether);
    }

    function testListForSaleRevertIfNotOwner() public {
        vm.prank(user);
        platform.MintAsset("IP", 1 ether, block.timestamp + 30 days);
        vm.startPrank(buyer);
        vm.expectRevert(IntellitradePlatform.CallerIsNotTheOwner.selector);
        platform.ListForSale(1, 1 ether);
        vm.stopPrank();
    }

    function testBuyAsset() public {
        // Mint and list asset for sale by the user.
        vm.prank(user);
        platform.MintAsset("IP", 0.001 ether, block.timestamp + 30 days);
        vm.prank(user);
        platform.ListForSale(1, 0.001 ether);

        // Fund the buyer
        vm.deal(buyer, 100 ether);

        // Buyer purchases the asset.
        vm.prank(buyer);
        platform.BuyAsset{value: 0.001 ether}(1);

        // Switch caller to buyer to check their owned assets.
        vm.prank(buyer);
        uint256[] memory buyerAssets = platform.getUserAssets();
        assertEq(buyerAssets.length, 1, "Buyer should own one asset");

        (, address newOwner, , , , bool isForSale) = platform.getAssetDetails(
            buyerAssets[0]
        );

        assertEq(newOwner, buyer, "Asset ownership should be transferred");
        assertEq(isForSale, false, "Asset should not be listed for sale");
    }

    function testBuyAssetRevertIfIncorrectETH() public {
        vm.prank(user);
        platform.MintAsset("IP", 1 ether, block.timestamp + 30 days);
        vm.prank(user);
        platform.ListForSale(1, 1 ether);

        vm.deal(buyer, 100 ether);
        vm.prank(buyer);
        vm.expectRevert(IntellitradePlatform.IncorrectETHERisSent.selector);
        platform.BuyAsset{value: 0.5 ether}(1);
    }

    function testBuyAssetRevertIfExpired() public {
        // Mint an asset that expires soon (less than 1 day ahead)
        uint256 soonExpiry = block.timestamp + 1 hours;
        vm.prank(user);
        platform.MintAsset("IP", 1 ether, soonExpiry);
        vm.prank(user);
        platform.ListForSale(1, 1 ether);

        vm.deal(buyer, 100 ether);
        vm.prank(buyer);
        vm.expectRevert(
            abi.encodeWithSelector(
                IntellitradePlatform.OutOfExpiry.selector,
                soonExpiry
            )
        );
        platform.BuyAsset{value: 1 ether}(1);
    }

    function testRemoveAssetFromSale() public {
        vm.prank(user);
        platform.MintAsset("IP", 1 ether, block.timestamp + 30 days);
        vm.prank(user);
        platform.ListForSale(1, 1 ether);

        vm.prank(user);
        platform.RemoveAssetFromSale(1);

        (, , , , , bool isForSale) = platform.getAssetDetails(1);

        assertEq(isForSale, false, "Asset should not be listed for sale");
    }

    function testGetAssetDetailsRevertIfInvalidId() public {
        vm.prank(user);
        vm.expectRevert(IntellitradePlatform.theAssetNotFound.selector);
        platform.getAssetDetails(999);
    }

    function testGetUserAssets() public {
        vm.prank(user);
        platform.MintAsset("IP", 1 ether, block.timestamp + 30 days);
        vm.prank(user);
        uint256[] memory assets = platform.getUserAssets();
        assertEq(assets.length, 1, "User should have one asset");
    }

    function testFallbackReverts() public {
        // Sending ETH directly to the contract should revert.
        vm.deal(buyer, 1 ether);
        vm.prank(buyer);
        (bool success, ) = address(platform).call{value: 1 ether}("");
        assertFalse(success, "Fallback should revert on direct ETH transfers");
    }
}
