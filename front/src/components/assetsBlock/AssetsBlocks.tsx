import React, { useState } from "react";
import IconByToken from "./IconByToken";
import { Assets } from "./UserAssetContainer";
import ApproveModal from "../modals";
import { useRecoilValue } from "recoil";
import { isTransferAtom } from "@/states/globalAtom";

const AssetsBlocks = ({
  ticker,
  network,
  amount,
  tokenId,
  tokenAddress,
}: Assets) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isTransfer = useRecoilValue(isTransferAtom);

  const handleIsOpen = (state: boolean) => {
    console.log(`prev-isOpen : ${isOpen} -> next-isOpen : ${state}`);
    setIsOpen(state);
  };

  return (
    <div
      onClick={() => {
        if (setIsOpen && isOpen === false) {
          setIsOpen(true);
        }
      }}
      className="w-full flex rounded-md px-8 py-3 hover:bg-gray-100 hover:cursor-pointer border-x-2/3 border-b-[1px] border-dark-50"
    >
      <div className="w-1/2 flex justify-start items-center">
        <IconByToken ticker={ticker} />
        <p className="ml-2">{network}</p>
      </div>
      <div className="w-1/2 flex justify-end items-center">
        {ticker === "CURG" && isTransfer === true ? (
          <p className="text-md font-medium">0</p>
        ) : (
          <>
            <p className="text-md font-medium">
              {amount?.toString().split(".")[0]}.
            </p>
            <p className="text-sm text-gray-400">
              {amount?.toString().split(".")[1]}
            </p>
          </>
        )}
      </div>
      {isOpen === true ? (
        <div
          onKeyDown={(event) => {
            if (event.key === "Escape") setIsOpen(false);
          }}
        >
          <ApproveModal
            setIsOpen={handleIsOpen}
            ticker={ticker}
            network={network}
            amount={amount}
            tokenId={tokenId}
            tokenAddress={tokenAddress}
          />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default AssetsBlocks;
