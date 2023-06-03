import UserAssetContainer from "@/components/assetsBlock/UserAssetContainer";
import React from "react";
import { assets } from "../config/assets";
import AAAssetsContainer from "@/components/aaAssetsBlock/AAAssetsContainer";
import Header from "@/components/Header";

const Home = () => {
  return (
    <>
      <Header />
      <main className="w-4/5 mx-auto flex">
        <div className="w-1/2 pt-28">
          <p className="text-xl font-semibold">My Assets</p>
          <UserAssetContainer assets={assets} />
        </div>
        <div className="w-1/2 pt-28 ml-8">
          <p className="text-xl font-semibold">My AA Wallet Assets</p>
          <AAAssetsContainer />
        </div>
      </main>
    </>
  );
};

export default Home;
