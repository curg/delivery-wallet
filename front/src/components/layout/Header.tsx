"use client";
import { useConnectWallet } from "@/hooks/useConnectWallet";
import { shortenAddress } from "@/utils/shortenAddress";
import Profile from "../buttons/Profile";
import Chevron from "../icons/Chevron";
import ConnectWallet from "../buttons/ConnectWallet";
import React, { useEffect, useState } from "react";
import { walletStateAtom } from "@/states/globalAtom";
import { useRecoilState } from "recoil";
import Logo from "../logo/Logo";

const Header = () => {
  const { isConnected, walletAddress } = useConnectWallet();
  const [showNetworks, setShowNetworks] = useState(false);
  const [walletState, setWalletState] = useRecoilState(walletStateAtom);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", (chainId: string) => {
        // This will run whenever the chain changes
        setWalletState((oldState) => ({
          ...oldState,
          networkId: chainId,
          networkName: getNetworkName(chainId), // You would need to implement getNetworkName
        }));
      });
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("chainChanged");
      }
    };
  }, []);

  function getNetworkName(chainId: string) {
    const network = networks.find((net) => net.chainId === chainId);
    return network ? network.name : "Unknown Network";
  }

  const handleConnectWallet = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleNetworkSwitch = async (network: { name: any; chainId: any }) => {
    const { chainId, name } = network;
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });
      setShowNetworks(false);
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId,
                rpcUrls: [
                  "https://mainnet.aurora.dev/7epjAoMxtXAUbkoND7XsLzYZi3VSL3AiA1wKcAxRjHQ",
                  "https://aurora-testnet.infura.io/v3/22ad2e091544409192329f20daeaddef",
                ],
                chainName: name,
                nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
                blockExplorerUrls: [
                  "https://explorer.mainnet.aurora.dev/",
                  "https://explorer.testnet.aurora.dev/",
                ],
              },
            ],
          });

          // After adding, try switching again
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId }],
          });
          console.log("Switched to:", name, chainId); // Debug log
          if (walletState.networkId !== chainId) {
            setWalletState({
              ...walletState,
              networkId: chainId,
              networkName: name,
            });
            console.log("State updated:", walletState); // Debug log
          }
        } catch (addError) {
          console.error(addError);
        }
      } else {
        console.error(switchError);
      }
    }
  };

  const networks = [
    { name: "goerli Testnet", chainId: "0x5" },
    { name: "Aurora Mainnet", chainId: "0x4e454152" },
    { name: "Aurora Testnet", chainId: "0x4e454153" },
    // ... other networks ...
  ];

  return (
    <section className="w-full py-1 px-28 mx-auto bg-black">
      <div className={`flex items-center justify-between`}>
        <div className="w-auto">
          <div className="flex flex-wrap items-center">
            <Logo />
          </div>
        </div>
        <div className="w-auto">
          <div className="flex flex-wrap items-center">
            {isConnected ? (
              <div className="flex items-center w-auto py-3 px-6 rounded-3xl bg-white border-[1px] border-black">
                <Profile />
                <p className=" mx-3 font-heading text-lg">
                  {shortenAddress(walletAddress)}
                </p>

                <Chevron
                  onClick={() => setShowNetworks(!showNetworks)}
                  className="m-2 w-6 h-[100px]"
                />
                {showNetworks && (
                  <div className="mt-[150px] ml-11 absolute bg-white rounded-md shadow-lg">
                    {networks.map((network) => (
                      <div
                        key={network.chainId}
                        onClick={() => handleNetworkSwitch(network)}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                      >
                        {network.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <ConnectWallet
                onClick={handleConnectWallet}
                content="Connect Wallet"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
