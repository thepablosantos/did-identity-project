// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ERC725Identity {
    address public owner;

    // Mapeia chaves para valores
    mapping(bytes32 => bytes) internal store;

    event DataChanged(bytes32 indexed key, bytes value);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function setData(bytes32 _key, bytes calldata _value) external onlyOwner {
        store[_key] = _value;
        emit DataChanged(_key, _value);
    }

    function getData(bytes32 _key) public view returns (bytes memory) {
        return store[_key];
    }

    function transferOwnership(address newOwner) external onlyOwner {
        owner = newOwner;
    }
}