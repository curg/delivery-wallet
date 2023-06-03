import { atom } from "recoil";

export const walletStateAtom = atom({
  key: "walletStateAtom",
  default: {
    isConnected: false,
    eoaWalletAddress: "",
    signingKey: "",
    aaWalletAddress: "",
  },
});

export const isTransferAtom = atom({
  key: "isTransferAtom",
  default: false,
});
