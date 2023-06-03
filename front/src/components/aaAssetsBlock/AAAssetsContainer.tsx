"use client";
import React, { useCallback } from "react";
import ConnectWallet from "../buttons/ConnectWallet";
import { useRecoilState, useRecoilValue } from "recoil";
import { isTransferAtom, walletStateAtom } from "@/states/globalAtom";
import { ethers } from "ethers";
import {
  entryPoint,
  rpcUrl,
  simpleAccountFactory,
} from "@/api/wallet/config/constants";
import { getSimpleAccount } from "@/api/wallet/getSimpleAccount";
import { BASE_URL } from "@/constants";
import { shortenAddress } from "@/utils/shortenAddress";
import AAAssetsBlocks from "./AAAssetsBlocks";

const AAAssetsContainer = () => {
  const [{ eoaWalletAddress, aaWalletAddress, signingKey }, setWalletState] =
    useRecoilState(walletStateAtom);
  const isTransfer = useRecoilValue(isTransferAtom);

  const postWalletAddress = useCallback(async () => {
    const fetchResult = await fetch(`${BASE_URL}/addAddress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eoaAddress: eoaWalletAddress,
        aaAddress: aaWalletAddress,
      }),
    });

    return fetchResult;
  }, [eoaWalletAddress, aaWalletAddress]);

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

      await postWalletAddress();
    } catch (error) {
      console.log("Error creating wallet");
    }
  };

  return (
    <div className="w-full h-[60vh] mt-3 rounded-lg bg-purple-50 px-4 relative">
      <div className="w-full flex justify-between items-center">
        <div className="text-white flex items-center">
          <p className="mr-2 font-semibold">Address: </p>
          {shortenAddress(aaWalletAddress)}
        </div>
        <div className="flex justify-between items-center p-5 text-gray-400">
          <div className="text-xs">
            <span className=" text-white">All</span>
            <span className="mx-4 text-white">/</span>
            <span className=" text-white">Token</span>
            <span className="mx-4 text-white">/</span>
            <span className=" text-white">NFTs</span>
          </div>
        </div>
      </div>
      {aaWalletAddress === "" && (
        <ConnectWallet
          onClick={handleCreateWallet}
          content="Create AA Wallet"
        />
      )}
      {isTransfer && (
        <AAAssetsBlocks
          ticker={"CURG"}
          network={"CURG"}
          amount={20}
          tokenId={1}
          tokenAddress={"1234"}
        />
      )}
    </div>
  );
};

export default AAAssetsContainer;
