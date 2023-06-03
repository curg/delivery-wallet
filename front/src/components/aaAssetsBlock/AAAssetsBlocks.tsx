import React from "react";
import { Assets } from "../assetsBlock/UserAssetContainer";
import IconByToken from "../assetsBlock/IconByToken";

const AAAssetsBlocks = ({ ticker, network, amount }: Assets) => {
  return (
    <div className="w-full flex rounded-md px-8 py-2 bg-purple-200 hover:cursor-pointer">
      <div className="w-1/2 flex justify-start items-center">
        <IconByToken ticker={ticker} />
        <p className="ml-2">{network}</p>
      </div>
      <div className="w-1/2 flex justify-end items-center">
        <p className="text-md font-medium">
          {amount?.toString().split(".")[0]}
        </p>
        <p className="text-sm text-purple-600 pt-[3px]">
          {amount?.toString().split(".")[1]}
        </p>
        <p className="text-md ml-2">{ticker}</p>
      </div>
    </div>
  );
};

export default AAAssetsBlocks;
