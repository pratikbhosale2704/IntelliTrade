// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {IntellitradePlatform} from "../src/inellitrade.sol";

contract Deployintellitrade is Script {
    function run() external returns (IntellitradePlatform) {
        vm.startBroadcast();
        IntellitradePlatform intellitrade = new IntellitradePlatform();
        vm.stopBroadcast();
        return intellitrade;
    }
}
