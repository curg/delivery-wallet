import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import { getSimpleAccount } from "./getSimpleAccount"; // adjust the path as needed
import wallet from "./config/wallet.json"; // adjust the path as needed

export default async function WalletCreatehandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const provider = new ethers.providers.JsonRpcProvider(wallet.rpcUrl);
      const { signingKey } = req.body;
      const accountAPI = getSimpleAccount(
        provider,
        signingKey,
        wallet.entryPoint,
        wallet.simpleAccountFactory
      );
      const address = await accountAPI.getCounterFactualAddress();
      return res.status(200).json({ SimpleAccountAddress: address });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error retrieving account address" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
//로컬에서 개인키 생성해야함
//1. 지갑 연결시 backend에 EOA 주소 전달
//2. EOA 주소를 DB에서 조회하고 AA 주소가 있는지
//wacter를 받고
//메타마스크 연결했을떄
//만들어서 받으면

//db에 비교를 해서 있다 없다 체크하고

//만들어달라고

//지갑이 만들어졌다고 하면

//서버를 계속 돌리고 있고 api를 만들기
//getNewAddress
//웹소켓 해야될 것 같은데
