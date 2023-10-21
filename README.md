# Delivery Wallet
### ETH SEOUL 2023

This project was submitted for the 2023 ETHSeoul Hackathon, which took place June 1 - June 4, 2023 (3 days).

origin Source: <https://devfolio.co/projects/delivery-wallet-9e8d>

DEMO:

[![Delivery Wallet | Asset migration from EOA to AA](http://img.youtube.com/vi/2E_PSYyd6ZY/0.jpg)](https://youtu.be/2E_PSYyd6ZY?t=0s) 

#### TEAM

CURG AA-Lounge Team 6 Participating Team Members

- [Choo Scott](https://github.com/scottXchoo)
- [Kevin Ha](https://github.com/onlyhyde)
- [James Lee](https://github.com/hereokay)
- [JaeHun Lee](https://github.com/Resister-boy)
- [MinWoo Nam](https://github.com/minwoogramer)
- [JungHoon Koh](https://github.com/kjh24871)

## The problem Delivery Wallet solves

### Background

Since Ether Denver, ERC-4337 (Account Abstraction) has become more widely known. And various services have emerged. Stackup, Safe, and Biconomy support Bundler, Paymaster, and Account Abstraction Wallet, and Alchemy is developing Rundler. Recently, Visa, a global company, deployed Paymaster on its testnet.

---

### Problem

Many people are looking forward to the UX changes and ease of use of AA Wallet as a new wallet type, but in reality, AA Wallet is not as easy to use as expected.

#### Problem 1

Users who are already using wallets that support EOA, such as MetaMask, have to move all of their assets in order to use an account abstraction wallet. In particular, this hurdle becomes very high as the amount of assets as well as the type of assets varies. In addition, it is not clean to move your assets to the account abstraction wallet due to issues such as charging fees in the process of moving assets. (Ex, 0.0000385939434 ETH -> Sludge Coin or Token)
Multiple signatures are required to move various assets.

#### Problem 2

There are many services that support various account abstraction wallets, but since account abstraction is a contract-based wallet, a contract wallet must exist for each chain. Therefore, it is inconvenient to create an account abstraction wallet for each chain. Of course, there are some services that support multiple wallets, but you can only create wallets on the chains that the service supports. In addition, you need to use a bridge app to transfer between heterogeneous chains, and the transfer process is complicated. (Step 1. EOA account -> Bridged EOA account, Step 2. Bridged EOA account -> AA account)

---

### Solution

#### Problem 1 Solution

Use the proposed contract to easily and conveniently move assets to an account abstraction wallet with no gas fees. Most of the assets are tokens of ERC-20 or ERC-721, 1155 standard. The standard has two transfer methods: Trnasfer and TransferFrom. TransferFrom is already widely used in most DApp contracts to transfer assets. Users just need to authorize the transfer of assets in the contract proposed by our team, and they can move various assets to the account abstraction wallet without the need for multiple signatures.

#### Problem 2 Solution

You need to create an Account Abstraction Wallet for each chain, but our proposed service allows you to create Account Abstraction Wallets for multiple chains with a single click. This is possible because there are already several Factory Contracts of Account Abstraction Wallets for each chain, which can be used to create new AA Wallet Contracts.

---

## Challenges we ran into

### Technical Huddle

#### Create an AccountAbstraction Wallet (hereinafter, AA Wallet)

To create an AA Wallet, you need to know the address of the Entrypoint Contract and Wallet Factory Contract, and you need the user's private key. You can create an AA wallet in a chain where Entrypoint is deployed, but in a chain where it is not deployed, you need to build your own infrastructure. For now, we've limited it to chains supported by Stackup.

### Move multiple assets at once

#### tokens

In order to move tokens, the user must approve the contract proposed by our team to move assets. The more types of tokens, the more signatures are required. To do this, we need to create a RawTransaction that authorizes multiple token contracts to access the address of our team's contract with a single signature, and execute it in batch form. The BatchApprove function is provided by the Woorim team's contract, and in the process of executing it as a call to each contract, there was a problem that Approve processing was not smooth because msg.sender was not the owner. This issue could not be applied to the demo, and research is underway on possible solutions.

#### Coins

Unlike tokens, coin assets require users to send assets via Transfer. In this case, it is difficult to transfer cleanly due to gas fees, but to solve this problem, there is a way to convert and transfer assets in a wrapped form. It is necessary to connect to a De-Fi DApp service to swap token assets in wrapped form, but it was not supported in the demo version.

#### Private key management for control of AA Wallet

There are centralized and decentralized methods of private key management, but our team chose the decentralized method and issued private keys to users to manage AA Wallet by themselves.

#### Create AA Wallet by Chain

In order to support chain-specific AA wallet creation, an entry point must exist in the chain, but currently, entry points are only created in certain chains, and it is necessary to deploy entry points to solve this problem. Therefore, we tried to deploy Entrypoint Contract on Aurora Protocol, but the deployment failed due to code size issue. For this reason, we limited it to Stackup's supported chains.

#### Moving assets between heterogeneous chains

We tried to move ETH assets to the Near chain through the Aurora protocol above, but it was not supported in the current demo due to the failure of the Entrypoint deployment.
