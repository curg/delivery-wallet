import React from "react";

interface ConnectWalletProps {
  onClick: () => void;
}

const ConnectWallet = ({ onClick }: ConnectWalletProps) => {
  return <button onClick={onClick}></button>;
};

export default ConnectWallet;
