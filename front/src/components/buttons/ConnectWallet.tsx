import { ClickHandler } from "@/types";

import React from "react";
import { Wallet } from "../icons/Wallet";

type ConnectWalletProps = {
  onClick?: ClickHandler;
};

const ConnectWallet = ({ onClick }: ConnectWalletProps) => {
  return (
    <button
      onClick={onClick}
      className=" bg-dark-200 items-center flex rounded-3xl py-3 px-10"
    >
      <Wallet className="" />
      <p className="ml-2 text-white">Connect</p>
    </button>
  );
};

export default ConnectWallet;
