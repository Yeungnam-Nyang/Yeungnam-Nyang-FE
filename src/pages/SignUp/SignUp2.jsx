import React from "react";
import Logo from "../../components/common/Logo";
import Button from "../../components/common/Button";
import { useState, useEffect } from "react";
import "./SignUP1.css";
import "./SignUP2.css";
import { useNavigate,useLocation } from "react-router-dom";


export default function SignUp2() {
  const[Id,setId]=useState('');
  const[Pw,setPw]=useState('');
  const[Phone,setPhone]=useState('');
  const[Answer,setAnswer]=useState('');
  const [isValid, setIsValid] = useState(false);
  const [IdValid, setIdValid] = useState(false);
  const [PwValid, setPwValid] = useState(false);
  const [PhoneValid, setPhoneValid] = useState(false);
  const [AnswerValid, setAnswerValid]=useState(false);

  let navigate = useNavigate();
  const questions = [
    "당신이 태어난 도시의 이름은 무엇입니까?",
    "당신의 첫 번째 학교 이름은 무엇입니까?",
    "당신이 가장 좋아하는 음식은 무엇입니까?",
    "당신의 첫 번째 애완동물 이름은 무엇입니까?",
    "딩신의 어머니의 이름은 무엇입니까?",
  ];

  const [showPassword, setShowPassword] = useState(false);
  // 보임/안 보임 상태 관리

  // 패스워드 보임/안 보임 토글 함수
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const location = useLocation();
  const { state } = location;

  const schoolName = state?.schoolName;
  const studentId = state?.studentId;
  const Name = state?.Name;

  const handleId = (e) => {
    const value = e.target.value.trim(); // 입력값에서 앞뒤 공백 제거
    setId(value); // 상태 업데이트
    const regex = /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{6,10}$/;
    setIdValid(regex.test(value)); // 입력값에 대해 정규식 검사
  };
  const handlePw = (e) => {
    const value = e.target.value.trim(); // 입력값에서 앞뒤 공백 제거
    setPw(value); // 상태 업데이트
    const regex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-z0-9!@#$%^&*]{8,20}$/;
    setPwValid(regex.test(value)); // 입력값에 대해 정규식 검사
  };
  const handlePhone = (e) => {
    const value = e.target.value.trim(); // 입력값에서 앞뒤 공백 제거
    setPhone(value); // 상태 업데이트
    const regex = /^01[016789][0-9]{7,8}$/;
    setPhoneValid(regex.test(value)); // 입력값에 대해 정규식 검사
  };
const handleAnswer = (e) => {
  const value = e.target.value.trim(); // 입력값에서 앞뒤 공백 제거
  setAnswer(value); // 상태 업데이트
}
  return (
    <>
      <div className="signup-container">
        <Logo />

        <h2 className="signup-title">SIGN UP</h2>

        <input
          type="text"
          placeholder="아이디를 입력하세요."
          value={Id}
          onChange={handleId}
          className="ID"
        ></input>
        <div className='errorMesage'>
          {!IdValid && Id.length > 0 && (
            <div>최소 6자 이상, 최대 10자 이하의 알파벳 소문자 및 숫자를 입력하세요</div>
          )}
        </div>
        <div className="PW-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력하세요."
            value={Pw}
            onChange={handlePw}
            className="PW"
          ></input>
          <button
            type="button"
            className="toggle-password"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
          </div>
          <div className='errorMesage'>
          {!PwValid && Pw.length > 0 && (
            <div>최소 8자 이상, 최대 20자 이하의 알파벳 소문자, 숫자, 특수문자를 입력하세요.</div>
          )}
        </div>
        <div className="verification">
         <div className="input-container">
         <input
            type="text"
            placeholder="휴대폰 번호를 입력하세요.(숫자만)"
            value={Phone}
            onChange={handlePhone}
            className="Phone"
          ></input>
          <button type="button" className="sendVerification">
            인증번호
          </button>
         </div>
        </div>
        <div className='errorMesage'>
        {!PhoneValid && Phone.length > 0 && (
            <div>올바른 전화 번호를 입력하세요.</div>
          )}
        </div>

        <select className="Select">
          <option>질문을 선택하세요.</option>
          {questions.map((question, index) => (
            <option key={index}>{question}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="답변을 입력하세요."
          value={Answer}
          onChange={handleAnswer}
          className="inputAnswer"
        ></input>

        <div className='errorMesage'>
        {Answer.length == 0 && (<div>질문 대답은 필수입니다.</div>)}
        </div>
        <Button text={"회원 가입"} className="button" onClick={onclick} />
      </div>
    </>
  );
}
