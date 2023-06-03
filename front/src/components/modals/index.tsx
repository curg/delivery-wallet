// pages/index.js
import { useState } from "react";
import CustomModal from "./Modal";

export default function Modal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleApporve = () => {
    console.log("approve");
  };
  //Btn Class
  const BtnContainerClass = `flex justify-center items-center`;
  const ApproveBtnClass = `boerder-2 text-white`;
  const CancleBtnClass = `w-`;
  //tokenName 정보 받아서 넣어야함
  const tokenName = "USDC";
  //tokenAmount 정보 받아서 넣어야함
  const tokenAmount = 100.0;
  const formattedNumber = tokenAmount.toLocaleString(undefined, {
    minimumFractionDigits: 6,
    maximumFractionDigits: 6,
  });
  //"Modal Logic"!
  //EOA address
  //token address
  //token amount
  //metamask signing event발생시 백엔드로 위 파라미터 보내야함

  //assets에서 Usdc누를시 modal 창 띄어주기s
  //Modal 요소는
  //title = Asset Move Amount
  //??? Token
  //enter Amount <input/> (e.g: 100(input) USDC)
  //input 넣을시 유저의 Account(EOA) Balance를 확인해서 현재 input 값이 유저의 Balnace보다 많다면 유저 Balance의 량만큼 Input에 띄어주기
  //input에는 onChange Event 걸어서 유저가 input에 값을 넣을때마다 유저의 Balance와 비교해서 유저의 Balance보다 많다면 유저의 Balance의 량만큼 Input에 띄어주기
  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div className="flex justify-start items-center">
          <h2>Asset Move Amount</h2>
        </div>
        <div>
          <span>{`${tokenName} Token`}</span>
          <span>{`${formattedNumber}`}</span>
        </div>

        <div className={BtnContainerClass}>
          <button className={CancleBtnClass} onClick={closeModal}>
            Close
          </button>
          <button className={ApproveBtnClass} onClick={handleApporve}>
            Approve
          </button>
        </div>
      </CustomModal>
    </div>
  );
}
