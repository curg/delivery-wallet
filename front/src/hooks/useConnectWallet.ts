import { useRecoilState } from "recoil";
import { ethers } from "ethers";
import { useEffect } from "react";
import { walletStateAtom } from "@/states/globalAtom";

declare global {
  interface Window {
    ethereum: any;
  }
}

export const useConnectWallet = () => {
  const [walletState, setWalletState] = useRecoilState(walletStateAtom);

  useEffect(() => {
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
          });
        } else {
          setWalletState({
            isConnected: false,
            walletAddress: "",
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
