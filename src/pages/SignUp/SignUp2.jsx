import React, { useState, useEffect } from "react";
import Logo from "../../components/common/Logo";
import Button from "../../components/common/Button";
import { useNavigate, useLocation } from "react-router-dom";
import "./SignUp1.css";
import axios from 'axios';
import { FaEyeSlash,FaEye } from "react-icons/fa";
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
  const departmentName = state?.departmentName;
  const [enteredCode, setEnteredCode] = useState('');
  const questions = [
    "당신이 태어난 도시의 이름은 무엇입니까?",
    "당신의 첫 번째 학교 이름은 무엇입니까?",
    "당신이 가장 좋아하는 음식은 무엇입니까?",
    "당신의 첫 번째 애완동물 이름은 무엇입니까?",
    "당신의 어머니의 이름은 무엇입니까?",
  ];
  const API_URL=import.meta.env.VITE_SERVER_URL;
  useEffect(() => {
    let interval = null;

    // 타이머가 시작되었고 남은 시간이 있을 경우 타이머를 시작
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isTimerRunning) {  // 타이머가 0에 도달했을 때
      clearInterval(interval);  // 타이머 정지
      setIsTimerRunning(false);  // 타이머 동작 상태 종료
      alert("타이머가 만료되었습니다. 인증번호를 다시 요청하세요.");
      setIsCertificationSent(false);  // 인증번호 전송 상태 초기화
    }

    // 컴포넌트가 언마운트되거나 타이머가 변경될 때마다 interval을 정리
    return () => clearInterval(interval);
  }, [timer, isTimerRunning]); // timer와 isTimerRunning이 변경될 때마다 실행



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
        studentNumber: studentId.toString(),
        studentName: Name,
        schoolName: schoolName,
        departmentName: departmentName,
      };

      axios.post(`${API_URL}/api/signup`, data)
        .then(response => {
          console.log('회원 가입 성공:', response.data);
          router('/');
        })
        .catch(error => {
          console.error('회원 가입 중 오류 발생:', error.response);
        });
    } else {
      alert('모든 질문을 올바르게 입력하세요.');
    }
  };

  useEffect(() => {
    // 타이머를 0으로 초기화하지 않고, 초기 상태를 설정합니다.
    setIsTimerRunning(false);  // 타이머 동작 여부 초기화
    setIsCertificationSent(false);  // 인증번호 전송 여부 초기화
  }, []);  // 빈 배열을 넣어 컴포넌트가 처음 마운트될 때만 실행되도록 함

  const handleSendCertification = () => {
    if (PhoneValid) {
      if (isCertificationSent) {
        alert("인증번호가 이미 전송되었습니다.");
      } else {
        setTimer(180);  // 3분 (180초) 타이머 시작
        setIsTimerRunning(true);
        setIsCertificationSent(true);

        // 실제로 인증번호를 전송하는 API 호출
        axios.post(`${API_URL}/api/sms/send-Verification`, { userPhoneNumber: Phone })
          .then(response => {
            alert("인증번호가 전송되었습니다.");
          })
          .catch(error => {
            alert("인증번호 전송 중 오류 발생.");
            console.error(error);
          });
      }
    } else {
      alert("유효한 전화번호를 입력하세요.");
    }
  };
  
  const handleVerifyCertification = () => {
  axios.post(`${API_URL}/api/sms/confirm-Verification`, { userPhoneNumber: Phone, verificationNumber: enteredCode })
  .then(response => {
    alert("인증번호가 확인되었습니다.");
    setIsTimerRunning(false); // 타이머 멈춤
  })
  .catch(error => {
    alert("인증번호 확인 실패. 다시 시도하세요.");
    console.error(error);
  });

  };

  const handleCheckDuplicateId = () => {
    if (!IdValid) {
      alert("유효한 아이디를 입력하세요.");
      return;
    }
  
    axios
      .get(`${API_URL}/api/signup/checkId`, {
        params: { userId: Id }, // 쿼리 파라미터로 userId 전달
      })
      .then((response) => {
        if (response.status === 200) {
            // 서버에서 isAvailable과 같은 키로 아이디 사용 가능 여부를 확인한다고 가정
            alert("사용 가능한 아이디입니다.");
          } 
        
      })
      .catch((error) => {
        alert("이미 사용 중인 아이디입니다.");
      });
  };
  
  

  return (
    <div className="signup-container">
      <Logo />
      <h2 className="signup-title">SIGN UP</h2>

      <div className="certification">
        <div className="input-container">
        <input
        type="text"
        placeholder="아이디를 입력하세요."
        value={Id}
        onChange={handleId}
        className="ID"
      />
      <button type="button" className="sendCertification" onClick={handleCheckDuplicateId}>
            중복확인
      </button>
        </div>
      </div>
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
          {showPassword ? <FaEye /> : <FaEyeSlash />}
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
              value={enteredCode}
              onChange={(e) => setEnteredCode(e.target.value)}
              className="Phone"
            />
            <button type="button" className="sendCertification" onClick={handleVerifyCertification}>
              인증 확인
              ({Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')})
            </button>
          </div>
        </div>
      )}


        <select value={selectedQuestion} onChange={handleChange} className="Select">
          <option value="">질문을 선택하세요</option>
          {questions.map((question, index) => (
            <option key={index} value={question}>
              {question}
            </option>
          ))}
        </select>
      

      <input
        type="text"
        placeholder="답변을 입력하세요."
        value={Answer}
        onChange={handleAnswer}
        className="Answer"
      />

      <Button text="다음" onClick={handleSubmit} isValid={IdValid && PwValid && PhoneValid && Answer.length > 0 && selectedQuestion} />
    </div>
  );
}
