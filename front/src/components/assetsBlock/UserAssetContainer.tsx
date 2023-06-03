"use client"; // this is a client component 👈🏽
import React, { Dispatch, SetStateAction, useState } from "react";
import AssetsBlocks from "./AssetsBlocks";

export type Assets = {
  ticker: string;
  network: string;
  amount: number;
};

type Props = {
  assets: Assets[];
};

const UserAssetContainer = ({ assets }: Props) => {
  return (
    <div className="min-h-[500px] mt-8 border rounded-lg relative">
      <div className="flex justify-between items-center p-5 text-gray-400">
        <p className="text-sm">Chain</p>
        <div className="text-xs">
          <span>All</span>
          <span className="mx-4">/</span>
          <span>Token</span>
          <span className="mx-4">/</span>
          <span>NFTs</span>
        </div>
      </div>
      {assets?.map((asset, idx) => {
        return (
          <AssetsBlocks
            key={idx}
            ticker={asset.ticker}
            network={asset.network}
            amount={asset.amount}
          />
        );
      })}
    </div>
  );
};

export default UserAssetContainer;
