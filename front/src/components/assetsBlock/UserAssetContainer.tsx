"use client"; // this is a client component 👈🏽
import React, { Dispatch, SetStateAction, useState } from "react";
import AssetsBlocks from "./AssetsBlocks";
import { Modal } from "../modals";

export type Assets = {
  ticker: string;
  network: string;
  ammount: number;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
};

type Props = {
  assets: Assets[];
};

const UserAssetContainer = ({ assets }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-[500px] mt-8 border rounded-lg">
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
            ammount={assets.ammount}
            setIsOpen={setIsOpen}
          />
        );
      })}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default UserAssetContainer;
