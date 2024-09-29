import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/images/logo-big.png';
import Button from "../../components/common/Button";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
   // 더미 데이터
   const dummyId = 'testuser';
   const dummyPassword = 'Test@1234';
 
   // 유효성 검사 및 상태 업데이트
   const checkValidity = () => {
     setIsValid(id === dummyId && password === dummyPassword);
   };
 
   const handleLogin = () => {
     if (isValid) {
       console.log('ID:', id, 'Password:', password);
     }
   };

  const buttonConfigs = [
    { text: 'ID 찾기', onClick: () => {} },
    { text: '비밀번호 찾기', onClick: () => {} },
    { text: '회원가입', onClick: () => {} }
  ];

  const nav = useNavigate();
  const paths=["/login/findid","/login/findpwd","/signup1"];
  
  return <>
 <div className='login-container'>
  <img src={logo} alt="Logo" className="logo" />
  
  <h2 className='login-title'>LOGIN</h2>
 
 <h2 className='text-id'>ID:</h2>

  <input
        type="text"
        placeholder="ID를 입력해주세요."
        value={id}
        onChange={(e) => {
          setId(e.target.value);
          checkValidity();
        }}
        className="input-field"
      />
      
      <h2 className='text-pw'>PW:</h2>

      <input
        type="password"
        placeholder="PW를 입력해주세요."
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          checkValidity();
        }}
        className="input-field"
      />
      
      <Button type="button" text="확인" isValid={isValid} onClick={handleLogin}/>

      <div className="options">
        {buttonConfigs.map((button, index) => (
          <Button
            key={index}
            type="button"
            text={button.text}
            isValid={true} 
            onClick={()=> nav(paths[index])}
          />
        ))}
      </div>
 </div>
 
  </>;
}
