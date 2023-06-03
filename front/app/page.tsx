import React from "react";
import { assets } from "../config/assets";
import AAAssetsContainer from "@/components/aaAssetsBlock/AAAssetsContainer";
import UserAssetContainer from "@/components/assetsBlock/UserAssetContainer";

const Home = () => {
  return (
    <main className="w-4/5 mx-auto flex h-30vh">
      <div className="w-1/2 pt-16">
        <p className="text-xl font-semibold">My Assets</p>
        <UserAssetContainer assets={assets} />
      </div>
      <div className="w-1/2 pt-16 ml-8">
        <p className="text-xl font-semibold">My AA Wallet Assets</p>
        <AAAssetsContainer />
      </div>
    </main>
  );
};

export default Home;
