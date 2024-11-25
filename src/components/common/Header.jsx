import { Link } from "react-router-dom";
import { FaPen, FaUserPlus } from "react-icons/fa";

import Modal from "./Modal";
import { useState } from "react";
import api from "../../api/api";
export default function Header() {
  const [openModal, setOpenModal] = useState(false);

  //모달창 닫기
  const onClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <nav className="max-w-[768px] fixed top-0  w-full h-20 bg-yellow shadow-global flex gap-4 justify-between align-middle items-center px-3 z-10">
        {/* 홈으로 이동 */}
        <Link to="/" className="">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
            alt="logo"
            className="h-16 w-auto"
          />
        </Link>
        <div className="flex flex-row gap-4 ">
          <Link to="/post/write" className="hover:scale-125 duration-500">
            <FaPen size={25} color="#000000" />
          </Link>
          {/* 친구 추가 팝업창 */}
          <button onClick={() => setOpenModal(true)}>
            <FaUserPlus
              size={25}
              color="#000000"
              className="hover:scale-125 duration-500"
            />
          </button>
        </div>
      </nav>

      <Modal
        title="친구 추가"
        inputText="친구의 아이디를 입력하세요."
        type="submit"
        onClose={onClose}
        isOpen={openModal}
        isInputBox={true}
        url="/api/friend/add"
        keyName="friendId"
      />
    </>
  );
}
