// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

library LibENSEvents {
    event EnsRegistered(address user, string ensName, string userName);
    event DPUpdated(address user, string ensName);
    event NameRegistered(address user, string domainName);
    event AvatarUpdated(address user, string domainName);
}

library LibENSErrors {
    error EnsNotRegistered();
    error EnsAlreadyTaken();
    error NameAlreadyTaken();
    error NotEnsOwner();
    error DomainNotRegistered();
    error NotDomainOwner();
}