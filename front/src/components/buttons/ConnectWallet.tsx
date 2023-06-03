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
      className=" bg-dark-200 items-center flex rounded-3xl py-3 px-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <Wallet className="" />
      <p className="ml-2 text-white">{content}</p>
    </button>
  );
};

export default ConnectWallet;
