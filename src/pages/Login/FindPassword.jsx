import React, { useState } from 'react';
import Logo from '../../components/common/Logo';
import Button from "../../components/common/Button";
import './FindPassword.css';
import axios from 'axios';

export default function FindPassword() {
  const [userId, setUserId] = useState(""); 
  const [userQuestion, setQuestion] = useState('');
  const [userAnswer, setAnswer] = useState('');
  const [tempPassword, setTempPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const API_URL=import.meta.env.VITE_SERVER_URL;
  const questions = [
    "당신이 태어난 도시의 이름은 무엇입니까?",
    "당신의 첫 번째 학교 이름은 무엇입니까?",
    "당신이 가장 좋아하는 음식은 무엇입니까?",
    "당신의 첫 번째 애완동물 이름은 무엇입니까?",
    "당신의 어머니의 이름은 무엇입니까?",
  ];

  const handleButtonClick = async () => {
    try {
      // 서버로 요청 보낼 데이터s
      const requestData = {
        userId,
        userQuestion,
        userAnswer
      };

      // 서버로 POST 요청 보내기
      const response = await axios.post(`${API_URL}/api/send/new-password`, requestData);
      
      // 서버로부터 임시 비밀번호 받기
      setTempPassword(response.data.tempPassword);
      setShowPopup(true); // 팝업 띄우기
    } catch (error) {
      alert('정보를 확인해주세요. 오류가 발생했습니다.');
      console.error(error);
    }
  };

  return (
    <>
      <div className='Find-Container'>
        <Logo />
        <h2 className='Find-tittle'>FIND PW</h2>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="아이디를 입력하세요."
          className="input-field"
        />
        <select 
          id="questionDropdown" 
          value={userQuestion} 
          onChange={(e) => setQuestion(e.target.value)} 
          className="Select"
        >
          <option value="">질문을 선택하세요.</option>
          {questions.map((question, index) => (
            <option key={index} value={question}>{question}</option>
          ))}
        </select>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="답변을 입력하세요."
          className="input-field"
        />
        <Button type="button" text={"임시 PW 받기"} isValid={true} onClick={handleButtonClick} />
      </div>

      {/* 팝업 모달 */}
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            
            <p>{tempPassword}</p> {/* 서버에서 받은 임시 비밀번호 표시 */}

            <Button text={"닫기"} isValid={true} onClick={() => setShowPopup(false)}/>
          </div>
        </div>
      )}
    </>
  );
}
