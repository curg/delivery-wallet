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

export const txHashAtom = atom({
  key: "txHashAtom",
  default: "0x4527e2918b345e2f4b3afe9c1c1cf72f4c61252198db7150c1c0a3a24ffbd4c7",
});
