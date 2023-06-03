"use client";
import { useConnectWallet } from "@/hooks/useConnectWallet";
import { shortenAddress } from "@/utils/shortenAddress";
import React from "react";
import Profile from "../buttons/Profile";
import Chevron from "../icons/Chevron";
import ConnectWallet from "../buttons/ConnectWallet";
import Logo from "../logo/Logo";

const Header = () => {
  const { isConnected, walletAddress } = useConnectWallet();

  const handleConnectWallet = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
  };

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
                <Chevron className="" />
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
