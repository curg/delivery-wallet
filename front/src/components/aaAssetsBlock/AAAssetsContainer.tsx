import React from "react";
import ConnectWallet from "../buttons/ConnectWallet";

const AAAssetsContainer = () => {
  return (
    <div className="min-h-[450px] mt-8 flex justify-center items-center rounded-lg bg-purple-50">
      <ConnectWallet content="Create AA Wallet" />
    </div>
  );
};

export default AAAssetsContainer;
