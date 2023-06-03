import { useRecoilState } from "recoil";
import { ethers } from "ethers";
import { useEffect } from "react";
import { walletStateAtom } from "@/states/globalAtom";
import Seed from "mnemonic-seed-js";
declare global {
  interface Window {
    ethereum: any;
  }
}

export const useConnectWallet = () => {
  const [walletState, setWalletState] = useRecoilState(walletStateAtom);

  useEffect(() => {
    const seed = Seed.new();
    const privateKey =
      "0x" +
      Buffer.from(seed.buffer.buffer.slice(0, seed.buffer.length / 2)).toString(
        "hex"
      );

    const connectWallet = async () => {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Please install MetaMask!");
      }

      ethereum?.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletState({
            isConnected: true,
            walletAddress: accounts[0],
            signingKey: privateKey,
          });
        } else {
          setWalletState({
            isConnected: false,
            walletAddress: "",
            signingKey: "",
          });
        }
      });

      ethereum?.on("chainChanged", (chainId: string) => {
        console.log("chainChanged", chainId);
      });

      const provider = new ethers.providers.Web3Provider(ethereum);

      (async () => {
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setWalletState({
            isConnected: true,
            walletAddress: accounts[0],
            signingKey: privateKey,
          });
        }
      })();

      return () => {
        ethereum.removeAllListeners("accountsChanged");
        ethereum.removeAllListeners("chainChanged");
      };
    };

    connectWallet();
  }, [setWalletState]);

  return {
    isConnected: walletState.isConnected,
    walletAddress: walletState.walletAddress,
  };
};
