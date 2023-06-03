"use client";
import React from "react";
import ConnectWallet from "../buttons/ConnectWallet";
import { useRecoilState } from "recoil";
import { walletStateAtom } from "@/states/globalAtom";
import { ethers } from "ethers";
import {
  entryPoint,
  rpcUrl,
  simpleAccountFactory,
} from "@/api/wallet/config/constants";
import { getSimpleAccount } from "@/api/wallet/getSimpleAccount";

const AAAssetsContainer = () => {
  const [{ signingKey }, setWalletState] = useRecoilState(walletStateAtom);

  const handleCreateWallet = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      const accountAPI = getSimpleAccount(
        provider,
        signingKey,
        entryPoint,
        simpleAccountFactory
      );
      const address = await accountAPI.getCounterFactualAddress();

      setWalletState((prevState) => ({
        ...prevState,
        aaWalletAddress: address,
      }));
      return address;
    } catch (error) {
      console.log("Error creating wallet");
    }
  };

  return (
    <div className="min-h-[450px] mt-8 flex justify-center items-center rounded-lg bg-purple-50">
      <ConnectWallet onClick={handleCreateWallet} content="Create AA Wallet" />
    </div>
  );
};

export default AAAssetsContainer;
