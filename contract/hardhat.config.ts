import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-chai-matchers';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import 'dotenv/config';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';

const ETHEREUM_CHAIN_ID = '5';

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.18',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {},
    localhost: {
      url: 'http://127.0.0.1:8545',
    },
    mumbai: {
      url: process.env.MUMBAI_ENDPOINT_URL || '',
      accounts:
        process.env.WALLET_MUMBAI_PRIVATE_KEY !== undefined
          ? [process.env.WALLET_MUMBAI_PRIVATE_KEY]
          : [],
    },
  },
  etherscan: {
    apiKey:
      process.env.DEFAULT_CHAIN_ID == ETHEREUM_CHAIN_ID
        ? process.env.ETHERSCAN_API_KEY
        : process.env.POLYGONSCAN_API_KEY,
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  mocha: {
    timeout: 40000,
  },
  gasReporter: {
    enabled: true,
  },
};

export default config;
