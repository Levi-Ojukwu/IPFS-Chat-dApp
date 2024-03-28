// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console2} from "forge-std/Test.sol";
import {ChatDapp} from "../src/Chat.sol";

// import {LibChatErrors, LibChatEvents} from "../src/libraries/LibChat.sol";

contract ChatTest is Test {
    ChatDapp chatContract;

    address A = address(0xa);
    address B = address(0xb);
    address C = address(0xc);

    function setUp() public {
        chatContract = new ChatDapp();

        A = mkaddr("user A");
        B = mkaddr("user B");
        C = mkaddr("user C");
    }

    function switchSigner(address _newSigner) public {
        address foundrySigner = 0x1804c8AB1F12E6bbf3894d4083f33e07309d1f38;
        if (msg.sender == foundrySigner) {
            vm.startPrank(_newSigner);
        } else {
            vm.stopPrank();
            vm.startPrank(_newSigner);
        }
    }

    function mkaddr(string memory name) public returns (address) {
        address addr = address(
            uint160(uint256(keccak256(abi.encodePacked(name))))
        );
        vm.label(addr, name);
        return addr;
    }
}