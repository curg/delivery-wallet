"use client"; // this is a client component 👈🏽
// pages/index.js
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CustomModal from "./Modal";
import IconByToken from "../assetsBlock/IconByToken";
import Loading from "../Loading/loading";

interface ModalProps {
  ticker: string;
  network: string;
  amount: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ApproveModal = ({ setIsOpen, ticker, network, amount }: ModalProps) => {
  const [inputValue, setInputValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  const handleApporve = () => {
    setLoading(true);
    setIsOpen(false);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  const getAccountBalance = async () => {
    return 1000; // replace with actual balance
  };

  useEffect(() => {
    const fetchBalance = async () => {
      const accountBalance = await getAccountBalance();
      setBalance(accountBalance);
      const input = document.getElementById('amount');
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
  //Btn Class
  const BtnContainerClass = `flex justify-center items-cente w-full  my-4`;
  const ApproveBtnClass = `rounded-lg text-black bg-yellow-50 w-full px-2 py-2  hover:bg-purple-200 hover:cursor-pointer duration-10 `;
  const CancleBtnClass = `rounded-lg text-white bg-purple-100 w-1/3 px-2 py-2 mx-2 hover:bg-purple-200 hover:text-purple-100 hover:cursor-pointer duration-100`;
  //tokenName 정보 받아서 넣어야함
  const tokenName = "USDC";
  //tokenAmount 정보 받아서 넣어야함
  const tokenAmount = 100.0;
  const formattedNumber = tokenAmount?.toLocaleString(undefined, {
    minimumFractionDigits: 6,
    maximumFractionDigits: 6,
  });
  //"Modal Logic"!
  //EOA address
  //token address
  //token amount
  //metamask signing event 발생시 백엔드로 위 파라미터 보내야함

  //assets에서 Usdc누를시 modal 창 띄어주기s
  //Modal 요소는
  //title = Asset Move Amount
  //??? Token
  //enter Amount <input/> (e.g: 100(input) USDC)
  //input 넣을시 유저의 Account(EOA) Balance를 확인해서 현재 input 값이 유저의 Balance보다 많다면 유저 Balance의 량만큼 Input에 띄어주기
  //input에는 onChange Event 걸어서 유저가 input에 값을 넣을때마다 유저의 Balance와 비교해서 유저의 Balance보다 많다면 유저의 Balance의 량만큼 Input에 띄어주기
  return (
    <form className="fixed w-full h-screen bg-white bg-opacity-70 top-0 left-0 select-none">
      <div className="w-full h-full relative">
        <div
          onBlur={() => setIsOpen(false)}
          className="z-50 w-[500px] h-[300px] bg-[#8247E5] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-xl animate-slideDownModal px-8">
            <div className="w-full pt-4 pb-2">
              <h2 className="text-white text-xl">Asset Move Amount</h2>
            </div>
            {/* 토큰 이름과 토큰량이 표시되는곳 */}
            <div className="flex w-full h-[50px] my-5 items-center">
              <IconByToken ticker={ticker} />
              <span className="ml-2 text-white flex-1 justify-center">{ticker}</span>
              <div className="">
                <span className=" text-white w-full flex-3 justify-end text-md ml-6">
                  {`${formattedNumber} `}
                </span>
                <span className="text-[0.2rem] text-[#9BA1A8]">{`${ticker} `}</span>
              </div>
            </div>
            {/* 얼마를 보낼지 입력하는곳 */}
            <div className="flex justify-between w-full">
              <div className="flex items-center">
                <span className=" ml-2 text-sm text-white">
                  Enter Amount
                </span>
              </div>
              {/* input쪽에 필요한 내용들
      1.현재 어카운트에 들어있는 벨런스 체크 tokenAmount량 체크
      */}
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
                max
              </button>
            </div>
            <div className={BtnContainerClass}>
              <button className={CancleBtnClass} onClick={() => setIsOpen(false)}>
                Cancle
              </button>
              <button className={ApproveBtnClass} onClick={handleApporve}>
                Approve
              </button>
            </div>
          </div>
        {loading && <Loading />}
      </div>
    </form>
  )
}

export default ApproveModal