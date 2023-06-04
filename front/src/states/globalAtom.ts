import { atom } from "recoil";

export const walletStateAtom = atom({
  key: "walletStateAtom",
  default: {
    isConnected: false,
    eoaWalletAddress: "",
    signingKey: "",
    aaWalletAddress: "",
    networkId: "0x5",
    networkName: "goerli Testnet",
  },
});

export const isTransferAtom = atom({
  key: "isTransferAtom",
  default: false,
});
