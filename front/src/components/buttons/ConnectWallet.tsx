import { ClickHandler } from "@/types";
import React from "react";
import { Wallet } from "../icons/Wallet";

type ConnectWalletProps = {
  onClick?: ClickHandler;
  content: string;
};

const ConnectWallet = ({ onClick, content }: ConnectWalletProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-dark-150 items-center flex rounded-3xl py-3 px-6"
    >
      <Wallet className="" />
      <p className="ml-2 text-white">{content}</p>
    </button>
  );
};

export default ConnectWallet;
