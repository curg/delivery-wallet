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

export const assetsListAtom = atom({
  key: "assetsListAtom",
  default: [],
});
