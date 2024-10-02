import React, { useState, useEffect } from "react";
import Logo from "../../components/common/Logo";
import Button from "../../components/common/Button";
import { useNavigate, useLocation } from "react-router-dom";
import "./SignUP1.css";
import axios from 'axios';

export default function SignUp2() {
  const router = useNavigate();
  const [Id, setId] = useState('');
  const [Pw, setPw] = useState('');
  const [Phone, setPhone] = useState('');
  const [Answer, setAnswer] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState('');

  const [IdValid, setIdValid] = useState(false);
  const [PwValid, setPwValid] = useState(false);
  const [PhoneValid, setPhoneValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 타이머 관련 상태 추가
  const [timer, setTimer] = useState(0); // 남은 시간 (초)
  const [isTimerRunning, setIsTimerRunning] = useState(false); // 타이머가 동작 중인지 여부
  const [isCertificationSent, setIsCertificationSent] = useState(false); // 인증번호 전송 여부

  let navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const schoolName = state?.schoolName;
  const studentId = state?.studentId;
  const Name = state?.Name;

  const questions = [
    "당신이 태어난 도시의 이름은 무엇입니까?",
    "당신의 첫 번째 학교 이름은 무엇입니까?",
    "당신이 가장 좋아하는 음식은 무엇입니까?",
    "당신의 첫 번째 애완동물 이름은 무엇입니까?",
    "당신의 어머니의 이름은 무엇입니까?",
  ];

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      setIsTimerRunning(false);
      alert("타이머가 만료되었습니다. 인증번호를 다시 요청하세요.");
      setIsCertificationSent(false); // 인증번호 요청 초기화
    }
    return () => clearInterval(interval);
  }, [timer, isTimerRunning]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleId = (e) => {
    const value = e.target.value.trim();
    setId(value);
    const regex = /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{6,10}$/;
    setIdValid(regex.test(value));
  };

  const handlePw = (e) => {
    const value = e.target.value.trim();
    setPw(value);
    const regex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-z0-9!@#$%^&*]{8,20}$/;
    setPwValid(regex.test(value));
  };

  const handlePhone = (e) => {
    const value = e.target.value.trim();
    setPhone(value);
    const regex = /^01[016789][0-9]{7,8}$/;
    setPhoneValid(regex.test(value));
  };

  const handleAnswer = (e) => {
    const value = e.target.value.trim();
    setAnswer(value);
  };

  const handleChange = (e) => {
    setSelectedQuestion(e.target.value);
  };

  const handleSubmit = () => {
    if (IdValid && PwValid && PhoneValid && Answer.length > 0 && selectedQuestion) {
      const data = {
        userId: Id,
        userPassword: Pw,
        userPhoneNumber: Phone,
        userQuestion: selectedQuestion,
        userAnswer: Answer,
        studentNumber: studentId,
        studentName: Name,
        schoolName: schoolName,
      };

      axios.post('http://localhost:8080/api/signup', data)
        .then(response => {
          console.log('회원 가입 성공:', response.data);
          router('/login');
        })
        .catch(error => {
          console.error('회원 가입 중 오류 발생:', error.response);
        });
    } else {
      alert('모든 질문을 올바르게 입력하세요.');
    }
  };

  // 인증번호 전송 핸들러
  const handleSendCertification = () => {
    if (PhoneValid) {
      setTimer(180); // 3분 (180초) 타이머 시작
      setIsTimerRunning(true);
      setIsCertificationSent(true);

      // 여기에 실제로 인증번호를 전송하는 API 호출을 추가
      axios.post('http://localhost:8080/api/sms/send-Verification', { userPhoneNumber: Phone })
        .then(response => {
          alert("인증번호가 전송되었습니다.");
        })
        .catch(error => {
          alert("인증번호 전송 중 오류 발생.");
          console.error(error);
        });
    } else {
      alert("유효한 전화번호를 입력하세요.");
    }
  };

  const handleVerifyCertification = () => {
    // 인증번호 확인 로직 추가
    const enteredCode = document.querySelector('.certification input[type="text"]').value; // 입력한 인증번호
    axios.post('http://localhost:8080/api/sms/confirm-Verification', { userPhoneNumber: Phone, verificationNumber: enteredCode })
      .then(response => {
        alert("인증번호가 확인되었습니다.");
        setIsTimerRunning(false); // 타이머 멈춤
      })
      .catch(error => {
        alert("인증번호 확인 실패. 다시 시도하세요.");
        console.error(error);
      });
  };

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
        />
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
          />
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
        <div className="certification">
          <div className="input-container">
            <input
              type="text"
              placeholder="휴대폰 번호를 입력하세요.(숫자만)"
              value={Phone}
              onChange={handlePhone}
              className="Phone"
            />
            <button type="button" className="sendCertification" onClick={handleSendCertification}>
              인증번호
            </button>
          </div>
        </div>
        <div className='errorMesage'>
          {!PhoneValid && Phone.length > 0 && (
            <div>올바른 전화 번호를 입력하세요.</div>
          )}
        </div>

        {isCertificationSent && (
          <div className="certification">
            <div className="input-container">
              <input
                type="text"
                placeholder="인증번호를 입력하세요."
                className="Phone"
              />
              <button type="button" className="sendCertification" onClick={handleVerifyCertification}>
                확인 {timer > 0 && `(${Math.floor(timer / 60)}:${timer % 60 < 10 ? `0${timer % 60}` : timer % 60})`}
              </button>
            </div>
          </div>
        )}

        <select id="questionDropdown" className="Select" onChange={handleChange}>
          <option value="">질문을 선택하세요.</option>
          {questions.map((question, index) => (
            <option key={index} value={question}>{question}</option>
          ))}
        </select>


        <input
          type="text"
          placeholder="답변을 입력하세요."
          value={Answer}
          onChange={handleAnswer}
          className="inputAnswer"
        />

        <div className='errorMesage'>
          {Answer.length === 0 && (<div>질문 대답은 필수입니다.</div>)}
        </div>

        <Button text={"회원 가입"} isValid={true} className="button" onClick={handleSubmit} />
      </div>
    </>
  );
}