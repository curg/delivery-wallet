import React from "react";

const Loading = () => (
  <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(255,255,255,0.6)] z-50">
    <div className="flex justify-center items-center h-full space-x-2 animate-ping ">
      <div className="inline-flex w-4 h-4 bg-purple-500 rounded-full"></div>
      <div className="inline-flex w-4 h-4 bg-purple-500 rounded-full"></div>
      <div className="inline-flex w-4 h-4 bg-purple-500 rounded-full"></div>
    </div>
  </div>
);

export default Loading;
