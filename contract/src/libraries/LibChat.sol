// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

library LibChatEvents {
     event MessageSent(address indexed sender, address indexed receiver, uint256 timestamp);
}

library LibChatError {}