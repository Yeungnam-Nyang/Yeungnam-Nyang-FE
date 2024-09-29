import React from 'react';
import Logo from '../../components/common/Logo';
import Button from "../../components/common/Button";
import { useState, useEffect } from 'react';
import './SignUp1.css';
import { useNavigate } from 'react-router-dom';

export default function SignUp1() {
  const [schoolName, setSchoolName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [Name, setName] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [SchoolNameValid, setSchoolNameValid] = useState(false);
  const [StudentIdValid, setStudentIdeValid] = useState(false);
  const [NameValid, setNameValid] = useState(false);

  const nav = useNavigate();

  const handleSubmit = () => {
    // 입력된 데이터를 state로 전달
    nav('/signup2', { state: { schoolName, studentId, Name } });
  };

  const onClick = () => {
    handleSubmit();
  };

  const handleSchoolName = (e) => {
    const value = e.target.value.trim(); // 입력값에서 앞뒤 공백 제거
    setSchoolName(value); // 상태 업데이트
    const regex = /^[a-zA-Z가-힣]+$/;
    setSchoolNameValid(regex.test(value)); // 입력값에 대해 정규식 검사
  };

  const handleStudentId = (e) => {
    const value = e.target.value.trim(); // 입력값에서 앞뒤 공백 제거
    setStudentId(value); // 상태 업데이트
    const regex = /^[0-9]+$/;
    setStudentIdeValid(regex.test(value)); // 입력값에 대해 정규식 검사
  };

  const handleName = (e) => {
    const value = e.target.value.trim(); // 입력값에서 앞뒤 공백 제거
    setName(value); // 상태 업데이트
    const regex = /^[a-zA-Z가-힣]+$/;
    setNameValid(regex.test(value)); // 입력값에 대해 정규식 검사
  };

  // 모든 필드가 채워졌는지 확인하는 함수
  useEffect(() => {
    setIsValid(SchoolNameValid && StudentIdValid && NameValid);
  }, [SchoolNameValid, StudentIdValid, NameValid]);

  return (
    <>
      <div className="signup-container">
        <Logo className='logo'/>
        <h2 className='signup-title'>SIGN UP</h2>
        
        <input 
          type="text"
          placeholder="학교 명을 입력 해 주세요."
          value={schoolName}
          onChange={handleSchoolName}
          className="input-field"
        />
        <div className='errorMesage'>
          {!SchoolNameValid && schoolName.length > 0 && (
            <div>한글 또는 영어로 입력 해 주세요.</div>
          )}
        </div>

        <input 
          type="text"
          placeholder="학번을 입력 해 주세요."
          value={studentId}
          onChange={handleStudentId}
          className="input-field"
        />
        <div className='errorMesage'>
          {!StudentIdValid && studentId.length > 0 && (
            <div>숫자만 입력 해 주세요.       </div>
          )}
        </div>

        <input 
          type="text"
          placeholder="이름을 입력 해 주세요."
          value={Name}
          onChange={handleName}
          className="input-field"
        />
        <div className='errorMesage'>
          {!NameValid && Name.length > 0 && (
            <div>한글 또는 영어로 입력 해 주세요.</div>
          )}
        </div>
        
        <Button text={"다음"} isValid={isValid} onClick={onClick} className='button'/>
      </div>
    </>
  );
}