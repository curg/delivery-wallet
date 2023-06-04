import React from "react";
import { assets } from "../config/assets.config";
import AAAssetsContainer from "@/components/aaAssetsBlock/AAAssetsContainer";
import UserAssetContainer from "@/components/assetsBlock/UserAssetContainer";
import Image from "next/image";

const Home = () => {
  return (
    <main className="w-4/5 mx-auto flex h-30vh items-center">
      <div className="w-1/2 pt-16 mr-2">
        <p className="text-xl font-semibold">My Assets</p>
        <UserAssetContainer assets={assets} />
      </div>
      <div className=" w-10 h-10">
        <Image src="/assets/transfer.png" alt="logo" width={40} height={40} />
      </div>
      <div className="w-1/2 pt-16 ml-2">
        <p className="text-xl font-semibold">AA Wallet Assets</p>
        <AAAssetsContainer />
      </div>
    </main>
  );
};

export default Home;
