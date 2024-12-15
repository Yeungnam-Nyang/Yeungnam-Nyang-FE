import React, { useState } from 'react';
import Logo from '../../components/common/Logo';
import Button from "../../components/common/Button";
import './FindId.css';
import Wrapper from '../../components/common/Wrapper';

function Popup({ name, id, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popupid">
        <h3 className="popup-title">{name} 님의 아이디</h3>
        <p className="popup-id"><span className="popup-user-id">{id}</span></p>
        <Button text='확인' isValid={true} onClick={onClose} className='popup-button' />
      </div>
    </div>
  );
}


export default function FindId() {
  const [showPopup, setShowPopup] = useState(false);
  const [userId, setUserId] = useState(""); // 표시할 ID
  const [name, setName] = useState(""); // 사용자 이름
  const [schoolName, setSchoolName] = useState(""); // 학교 이름
  const [studentNumber, setStudentNumber] = useState(""); // 학번
  const API_URL=import.meta.env.VITE_SERVER_URL;
  const handleButtonClick = async () => {
    // 서버에 요청을 보내고 응답을 확인
    try {
      const response = await fetch(`${API_URL}/api/find/id`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          schoolName: schoolName,
          studentNumber: studentNumber,
          studentName: name,
        }),
      });

      const data = await response.json();

      if (response.ok && data.userId) {
        // ID가 존재하는 경우 팝업을 표시
        setUserId(data.userId);
        setShowPopup(true);
      } else {
        // ID가 존재하지 않거나 오류가 발생한 경우
        alert('입력한 정보가 일치하지 않습니다.'); // 사용자에게 오류 메시지 표시
      }
    } catch (error) {
      alert('서버와의 통신 중 오류가 발생했습니다.');
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false); // 팝업창 닫기
  };

  return (
    <Wrapper>
      <div className='Find-Container'>
        <Logo />
        <h2 className='Find-tittle'>FIND ID</h2>
        <input
          type="text"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
          placeholder="학교명을 입력 해 주세요."
          className="input-field"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력 해 주세요."
          className="input-field"
        />
        <input
          type="text"
          value={studentNumber}
          onChange={(e) => setStudentNumber(e.target.value)}
          placeholder="학번을 입력 해 주세요."
          className="input-field"
        />
        <Button text={"id 찾기"} className='button' isValid={true} onClick={handleButtonClick} />
      </div>
      
      {showPopup && <Popup name={name} id={userId} onClose={handleClosePopup} />}
    </Wrapper>
  );
}
  