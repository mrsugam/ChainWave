// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TipReward {
    event Tipped(address indexed from, address indexed to, uint256 amount);

    function tip(address payable _to) public payable {
        require(msg.value > 0, "Tip must be greater than 0");
        _to.transfer(msg.value);
        emit Tipped(msg.sender, _to, msg.value);
    }
}
