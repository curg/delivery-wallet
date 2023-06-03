// SPDX-License-Identifier: MIT License
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DeliveryWallet is Ownable {
  // TODO:
  event deliveryToken(address contractAddress, address from, address to, uint256 amount);

  constructor(){}

  function deliveryTokenAssets(address contractAddress, address from, address to, uint256 amount) public onlyOwner returns (bool) {
    IERC20 tokenContract = IERC20(contractAddress);
    
    // 1. call transferFrom function of contractAddress
    bool result_transferFrom = tokenContract.transferFrom(from, address(this), amount);
    if (!result_transferFrom) {
      revert('transferFrom Fail');
    }

    // 2. transfer assers to newAccount(Account Abstraction Address)
    bool result_transfer = tokenContract.transfer(to, amount);
    if (!result_transfer) {
      revert('transfer fail');
    }

    emit deliveryToken(contractAddress, from, to, amount);

    return true;
  }


}