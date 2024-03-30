// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;


import {Script, console} from "forge-std/Script.sol";
import "../src/Chat.sol";
import "../src/NameService.sol";

contract DeployScript is Script {

    NameService _nameService;
    ChatDapp _chatDapp;
    function setUp() public {}

    function run()  external {
        vm.startBroadcast();

        _nameService = new NameService();

        _chatDapp = new ChatDapp(address(_nameService));

        console.log(address(_nameService));
        console.log(address(_chatDapp));
    

        vm.stopBroadcast();
    }
}
