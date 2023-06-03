import { ethers } from 'hardhat';

async function main() {
  const DELIVERYWALLET = await ethers.getContractFactory('DeliveryWallet');
  const contract = await DELIVERYWALLET.deploy();

  await contract.deployed();

  console.log(`DeliveryWallet Contract is deployed to ${contract.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
