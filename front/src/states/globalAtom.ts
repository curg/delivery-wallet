import { atom } from "recoil";

export const walletStateAtom = atom({
  key: "walletStateAtom",
  default: {
    isConnected: false,
    eoaWalletAddress: "",
    signingKey: "",
    aaWalletAddress: "",
    networkId: "",
    networkName: "",
  },
});

export const isTransferAtom = atom({
  key: "isTransferAtom",
  default: false,
});
