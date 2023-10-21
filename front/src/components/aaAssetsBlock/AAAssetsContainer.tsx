"use client";
import React, { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isTransferAtom,
  txHashAtom,
  walletStateAtom,
} from "@/states/globalAtom";
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
import { Wallet } from "../icons/Wallet";

const AAAssetsContainer = () => {
  const [{ eoaWalletAddress, aaWalletAddress, signingKey }, setWalletState] =
    useRecoilState(walletStateAtom);
  const isTransfer = useRecoilValue(isTransferAtom);
  const txHash = useRecoilValue(txHashAtom);

  const postWalletAddress = useCallback(
    async (address: string) => {
      const fetchResult = await fetch(`${BASE_URL}/addAddress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eoaAddress: eoaWalletAddress,
          aaAddress: address,
        }),
      });

      console.log("fetchResult", fetchResult);
      return fetchResult;
    },
    [eoaWalletAddress]
  );

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

      await postWalletAddress(address);
    } catch (error) {
      console.log("Error creating wallet");
    }
  };

  return (
    <div className="w-full h-[50vh] mt-3 rounded-lg bg-purple-50 px-4">
      <div className="w-full flex justify-between items-center">
        <div className="text-white flex items-center">
          <p className="mr-2 font-semibold">Address: </p>
          {aaWalletAddress}
        </div>
        <div className="flex justify-between items-center p-5 text-gray-400"></div>
      </div>
      {aaWalletAddress === "" && (
        <button
          onClick={handleCreateWallet}
          className=" mt-40 bg-dark-200 items-center flex rounded-3xl py-3 px-6 mx-auto"
        >
          <Wallet className="" />
          <p className="ml-2 text-white">Create AA Wallet</p>
        </button>
      )}
      {isTransfer && (
        <>
          <AAAssetsBlocks
            ticker={"CURG"}
            network={"CURG"}
            amount={20}
            tokenId={1}
            tokenAddress={"1234"}
          />
          <div className="text-white text-right text-sm flex justify-end">
            <p className=" font-semibold">Tx Hash </p>:{" "}
            {shortenAddress(txHash || "")}
          </div>
        </>
      )}
    </div>
  );
};

export default AAAssetsContainer;
