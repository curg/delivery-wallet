"use client";
import { useConnectWallet } from "@/hooks/useConnectWallet";
import { shortenAddress } from "@/utils/shortenAddress";
import React from "react";
import Profile from "../buttons/Profile";
import Chevron from "../icons/Chevron";

const Header = () => {
  const { connected, address } = useConnectWallet();

  const handleConnectWallet = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="overflow-hidden w-4/5 mx-auto">
      <div className={`flex items-center justify-between py-4`}>
        <div className="w-auto">
          <div className="flex flex-wrap items-center">
            <p className=" text-3xl font-medium">Delivery Wallet</p>
          </div>
        </div>
        <div className="w-auto">
          <div className="flex flex-wrap items-center">
            {connected ? (
              <div className="flex items-center w-auto py-3 px-6 rounded-3xl border-[1px] border-black">
                <Profile />
                <p className=" mx-3 font-heading text-lg">
                  Address : {shortenAddress(address)}
                </p>
                <Chevron className="" />
              </div>
            ) : (
              <button
                onClick={handleConnectWallet}
                className="flex items-center w-auto py-3 px-6 rounded-3xl border-[1px] border-black"
              >
                <p className="m-auto font-heading text-lg">Connect Wallet</p>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
