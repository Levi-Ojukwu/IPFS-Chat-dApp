// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {LibENSErrors, LibENSEvents} from "./libraries/LibNameService.sol";

contract NameService {
    struct DomainDetails {
        string ensName;
        string displayURI;
        address owner;
    }

    mapping(string => address) public nameToAddress;
    mapping(string => DomainDetails) public domains;

    // This is to store registered names
    string[] public registeredNames;

    function getDomainDetails(
        string memory _ensName
    ) public view returns (string memory, string memory, address) {
        if (nameToAddress[_ensName] == address(0)) {
            revert LibENSErrors.EnsNotRegistered();
        }

        return (
            domains[_ensName].ensName,
            domains[_ensName].displayURI,
            domains[_ensName].owner
        );
    }

    function registerNameService(
        string memory _ensName,
        string memory displayURI
    ) public {
        if (nameToAddress[_ensName] != address(0)) {
            revert LibENSErrors.NameAlreadyTaken();
        }
        nameToAddress[_ensName] = msg.sender;
        domains[_ensName] = DomainDetails(
            _ensName,
            displayURI,
            msg.sender
        );

        emit LibENSEvents.NameRegistered(msg.sender, _ensName);
    }

    function updateEnsDP(
        string memory _ensName,
        string memory _displayURI
    ) public {
        if (nameToAddress[_ensName] == address(0)) {
            revert LibENSErrors.EnsNotRegistered();
        }
        if (nameToAddress[_ensName] != msg.sender) {
            revert LibENSErrors.NotEnsOwner();
        }

        domains[_ensName].displayURI = _displayURI;
        emit LibENSEvents.DPUpdated(msg.sender, _ensName);
    }

    function updateUserName(
        string memory _ensName,
        string memory _userName
    ) public {
        if (nameToAddress[_ensName] == address(0)) {
            revert LibENSErrors.EnsNotRegistered();
        }
        if (nameToAddress[_ensName] != msg.sender) {
            revert LibENSErrors.NotEnsOwner();
        }

        domains[_ensName].displayURI = _userName;
        emit LibENSEvents.DPUpdated(msg.sender, _ensName);
    }

    function getAllRegisteredUsers() public view returns (string[] memory) {
        return registeredNames;
    }
}