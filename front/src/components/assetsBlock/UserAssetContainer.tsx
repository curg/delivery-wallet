import React from "react";
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
    <div className="min-h-[450px] mt-8 border rounded-lg">
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
      {assets.map((assets, idx) => {
        return (
          <AssetsBlocks
            key={idx}
            ticker={assets.ticker}
            network={assets.network}
            amount={assets.amount}
          />
        );
      })}
    </div>
  );
};

export default UserAssetContainer;
