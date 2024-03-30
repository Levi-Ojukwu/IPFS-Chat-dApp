// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

library LibChatEvents {
     event MessageSent(address indexed sender, address indexed receiver, string content);
}

library LibChatError {}