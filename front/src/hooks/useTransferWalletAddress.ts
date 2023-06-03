import { BASE_URL } from "@/constants";

const useTransferWalletAddress = async () => {
  try {
    const fetchResult = await fetch(`${BASE_URL}/addAddress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eoaAddress: "0x7a9f3cd060ab180f36c7b3f0a8c1d1f0b1f0e9a8",
        aaAddress: "0x7a9f3cd060ab180f36c7b3f0a8c1d1f0b1f0e9a8",
      }),
    });
    console.log("fetchResult", fetchResult);
  } catch (error) {}
};

export default useTransferWalletAddress;
