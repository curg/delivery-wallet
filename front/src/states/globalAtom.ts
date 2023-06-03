import { atom } from "recoil";

export const walletStateAtom = atom({
  key: "walletStateAtom",
  default: {
    isConnected: false,
    walletAddress: "",
    signingKey: "",
  },
});

export const assetsListAtom = atom({
  key: "assetsListAtom",
  default: [],
});
