import React from "react";
import { Ethereum, Polygon, USDC, USDT } from "../icons";

type Prop = {
  ticker: string;
};

const IconByToken = ({ ticker }: Prop) => {
  switch (ticker) {
    case "ETH":
      return (
        <div>
          <Ethereum className="" />
        </div>
      );
    case "MATIC":
      return (
        <div>
          <Polygon className="" />
        </div>
      );
    case "USDC":
      return (
        <div>
          <USDC className="" />
        </div>
      );
    case "USDT":
      return (
        <div>
          <USDT className="" />
        </div>
      );
    default:
      return <div>Nothing</div>;
  }
};

export default IconByToken;
