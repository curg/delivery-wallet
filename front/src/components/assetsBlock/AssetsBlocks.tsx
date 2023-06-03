import React from "react";
import IconByToken from "./IconByToken";
import { Assets } from "./UserAssetContainer";

const AssetsBlocks = ({ ticker, network, amount, setIsOpen }: Assets) => {
  return (
    <div
      onClick={() => {
        if (setIsOpen) {
          setIsOpen(true);
          console.log(setIsOpen, "modal");
        }
      }}
      className="w-full flex rounded-md px-8 py-2 hover:bg-gray-100 hover:cursor-pointer"
    >
      <div className="w-1/2 flex justify-start items-center">
        <IconByToken ticker={ticker} />
        <p className="ml-2">{network}</p>
      </div>
      <div className="w-1/2 flex justify-end items-center">
        <p className="text-md font-medium">
          {amount.toString().split(".")[0]}.
        </p>
        <p className="text-sm text-gray-400">
          {amount.toString().split(".")[1]}
        </p>
        <p className="text-md ml-2">{ticker}</p>
      </div>
    </div>
  );
};

export default AssetsBlocks;
