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

export const assetsListAtom = atom({
  key: "assetsListAtom",
  default: [],
});
