import { ethers } from "ethers";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    ethereum: any;
  }
}

export const useConnectWallet = () => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const connectWallet = async () => {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Please install MetaMask!");
      }

      ethereum?.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          setConnected(true);
        } else {
          setAddress("");
          setConnected(false);
        }
      });

      ethereum?.on("chainChanged", (chainId: string) => {
        console.log("chainChanged", chainId);
      });

      const provider = new ethers.providers.Web3Provider(ethereum);

      (async () => {
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          setConnected(true);
        }
      })();

      return () => {
        ethereum.removeAllListeners("accountsChanged");
        ethereum.removeAllListeners("chainChanged");
      };
    };

    connectWallet();
  }, []);

  return {
    connected,
    address,
  };
};
