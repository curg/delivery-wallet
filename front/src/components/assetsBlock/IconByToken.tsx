import React from "react";
import { DAI, Ethereum, Polygon, USDC, USDT } from "../icons";
import { CURG } from "../icons/CURG";
import { WBTC } from "../icons/WBTC";

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
    case "CURG":
      return (
        <div>
          <CURG className="" />
        </div>
      )
    case "WBTC":
      return (
        <div>
          <WBTC className="" />
        </div>
      )
    case "DAI":
      return (
        <div>
          <DAI className="" />
        </div>
      )
    default:
      return <div>Nothing</div>;
  }
};

export default IconByToken;
