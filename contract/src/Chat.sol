// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {LibChatEvents} from "./libraries/LibChat.sol";

import {Struct, INameService} from "./interfaces/INameService.sol";

contract ChatDapp {
    struct Message {
        address sender;
        address receiver;
        string content;
    }

    mapping(address => mapping(address => Message[])) public chatHistory;

    INameService public nameService;

    Struct.DomainDetails[] registeredName;

    constructor(address _nameServiceAddress) {
        nameService = INameService(_nameServiceAddress);
    }

    function sendMessage(string memory _receiver, string memory _content) external {
        (address receiverAddress, , ) = nameService.getEnsDetails(_receiver);
        require(receiverAddress != address(0), "Receiver not registered");

        Message memory _message = Message(
            msg.sender,
            receiverAddress,
            _content
        );
        chatHistory[msg.sender][receiverAddress].push(_message);

        emit LibChatEvents.MessageSent(msg.sender, receiverAddress, _content);
    }

    function getMessages(string memory _sender, string memory _receiver)
        external
        view
        returns (Message[] memory)
    {
        (address senderAddress, , ) = nameService.getEnsDetails(_sender);
        require(senderAddress != address(0), "Sender not registered");

        (address receiverAddress, , ) = nameService.getEnsDetails(_receiver);
        require(receiverAddress != address(0), "Receiver not registered");

        return chatHistory[msg.sender][receiverAddress];
    }

    function getRegisteredUsers() external view returns (Struct.DomainDetails[] memory) {
        return nameService.getAllRegisteredUsers();
    }



















    // function chatCheck(address sender, address receiver) private view returns (uint256) {
    //     if (chatHistory[sender][receiver] != 0) {
    //         return chatHistory[sender][receiver];
    //     } else if (chatHistory[receiver][sender] != 0) {
    //         return chatHistory[receiver][sender];
    //     }
    //     return 0;
    // }
}