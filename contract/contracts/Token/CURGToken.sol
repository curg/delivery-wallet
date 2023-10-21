// SPDX-License-Identifier: MIT License
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

contract CURGToekn is ERC20, Ownable, ERC20Permit {

    constructor() ERC20("CURGToekn", "CURG") ERC20Permit("CURGToekn") {
       mint(msg.sender, 100_000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}