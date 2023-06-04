"use client"; // this is a client component 👈🏽
import { useEffect, useState } from "react";
import IconByToken from "../assetsBlock/IconByToken";
import Loading from "../Loading/loading";
import { ethers } from "ethers";
import { BASE_URL, ERC20_DECIMAL, SPENDER_ADDRESS } from "@/constants";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  isTransferAtom,
  txHashAtom,
  walletStateAtom,
} from "@/states/globalAtom";

interface ModalProps {
  ticker: string;
  network: string;
  amount: number;
  tokenId: number;
  tokenAddress: string;
  setIsOpen: (state: boolean) => void;
}

const ApproveModal = ({
  setIsOpen,
  ticker,
  amount,
  tokenAddress,
}: ModalProps) => {
  const [inputValue, setInputValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [txHash, setTxHash] = useRecoilState(txHashAtom);

  const setIsTransfer = useSetRecoilState(isTransferAtom);

  const { eoaWalletAddress } = useRecoilValue(walletStateAtom);

  const tokenAbi = [
    "function approve(address spender, uint256 amount) public returns(bool)",
  ];
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  const handleCancel = async () => {
    console.log("clicked cancel");
    setIsOpen(false);
  };

  const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);

  const handleApprove = async () => {
    const amountToApprove = ethers.utils.parseUnits(
      amount.toString(),
      ERC20_DECIMAL
    );

    await tokenContract.approve(SPENDER_ADDRESS, amountToApprove);

    setLoading(true);
    setIsOpen(false);

    console.log(
      "eoaWalletAddress.toLowerCase()",
      eoaWalletAddress.toLowerCase()
    );

    const result = await fetch(`${BASE_URL}/approve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eoaAddress: eoaWalletAddress.toLowerCase(),
        chainIdx: 1,
        amount: amountToApprove.toString(),
        tokenAddress: "0xB186887176E450bFfc03697b0684347f3f346F3D",
      }),
    });

    console.log("result", result);
    console.log("result.json()", await result.json());

    const data: any = await result;
    console.log("data", data);

    setTxHash(data?.txHash);
    setIsTransfer(true);
    setLoading(false);
  };

  const getAccountBalance = async () => {
    return amount; // replace with actual balance
  };

  useEffect(() => {
    const fetchBalance = async () => {
      const accountBalance = await getAccountBalance();
      setBalance(accountBalance);
      const input = document.getElementById("amount");
      input?.focus();
    };
    fetchBalance();
  }, []);

  const handleChange = (event: { target: { value: string } }) => {
    const enteredValue = parseFloat(event.target.value);
    if (isNaN(enteredValue)) {
      setInputValue(0);
    } else if (enteredValue > balance) {
      setInputValue(balance);
    } else {
      setInputValue(enteredValue);
    }
  };

  const handleMax = () => {
    setInputValue(balance);
  };

  const BtnContainerClass = `flex justify-center items-center w-full my-4`;
  const ApproveBtnClass = `rounded-lg text-black bg-yellow-50 w-full px-2 py-2 hover:bg-purple-200 hover:cursor-pointer duration-10 `;
  const CancelBtnClass = `rounded-lg text-white bg-purple-100 w-1/3 px-2 py-2 mx-2 hover:bg-purple-200 hover:text-purple-100 hover:cursor-pointer duration-100`;

  const formattedNumber = amount?.toLocaleString(undefined, {
    minimumFractionDigits: 6,
    maximumFractionDigits: 6,
  });

  return (
    <div className="fixed w-full h-screen bg-white bg-opacity-70 top-0 left-0 select-none">
      <div className="w-full h-full relative">
        <div
          // onBlur={() => setIsOpen(false)}
          className="z-50 w-[500px] h-[300px] bg-[#8247E5] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-xl animate-slideDownModal px-8"
        >
          <div className="w-full pt-4 pb-2">
            <h2 className="text-white text-xl">Asset Move Amount</h2>
          </div>

          <div className="flex w-full h-[50px] my-5 items-center">
            <IconByToken ticker={ticker} />
            <span className="ml-2 text-white flex-1 justify-center">
              {ticker}
            </span>
            <div className="">
              <span className=" text-white w-full flex-3 justify-end text-md ml-6">
                {`${formattedNumber} `}
              </span>
              <span className="text-[0.2rem] text-[#9BA1A8]">{`${ticker} `}</span>
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div className="flex items-center">
              <span className=" ml-2 text-sm text-white">Enter Amount</span>
            </div>

            <input
              id="amount"
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Enter amount"
              className="flex text-end w-3/4  rounded-lg px-4 py-2  focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="w-full flex justify-end items-center mt-3">
            <button
              onClick={() => handleMax()}
              className="text-white rounded-md bg-purple-100 text-[0.3rem] w-[40px] h-[20px] duration-100 hover:bg-purple-200 hover:text-purple-100 hover:cursor-pointer"
            >
              MAX
            </button>
          </div>
          <div className={BtnContainerClass}>
            <button className={CancelBtnClass} onClick={handleCancel}>
              Cancel
            </button>
            <button className={ApproveBtnClass} onClick={handleApprove}>
              Approve
            </button>
          </div>
        </div>
        {loading && <Loading />}
      </div>
    </div>
  );
};

export default ApproveModal;
