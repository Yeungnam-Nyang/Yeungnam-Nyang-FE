import React, { useState } from 'react';
import './Login.css';
import Button2 from "../../components/common/ButtonNopic";
import Button from "../../components/common/Button";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // axios import 추가
import Logo from '../../components/common/Logo';
export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false); // 유효성 검사 상태 추가
  const API_URL=import.meta.env.VITE_SERVER_URL;
  const nav = useNavigate();
  const paths = ["/login/findid", "/login/findpwd", "/signup1"];

  // 로그인 처리 함수
  const handleLogin = async () => {
    if (id === '' || password === '') {
      alert('로그인 실패! 빈 칸이 있습니다.');
    } else {
      try {
        const response = await axios.post(`${API_URL}/api/login`, {
          userId: id,
          userPassword: password
        });

        // 성공적인 로그인 응답 시
        localStorage.setItem('token', response.data.token); // JWT 토큰 저장

        // 성공 후 홈 페이지로 이동
        nav('/main');
      } catch (error) {
        // 로그인 실패 시 메시지
        alert('로그인 실패! ID 또는 비밀번호를 확인 해 주세요.');
      }
    }
  };

  // 유효성 검사 함수
  const checkValidity = () => {
    if (id && password) {
      setIsValid(true);  // ID와 PW가 모두 입력되었을 경우 버튼 활성화
    } else {
      setIsValid(false); // 하나라도 빈 칸이면 버튼 비활성화
    }
  };

  const buttonConfigs = [
    { text: 'ID 찾기 ', onClick: () => nav(paths[0]) },
    { text: 'PW 찾기 ', onClick: () => nav(paths[1]) },
    { text: '회원가입', onClick: () => nav(paths[2]) }
  ];

  return (
    <div className='login-container'>
      <Logo/>
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


        <Button type="button" text="확인" isValid={isValid} onClick={handleLogin} />

      <div className="options">
        {buttonConfigs.map((button, index) => (
            <Button2
            key={index}
            type="button"
            text={button.text}
            isValid={true}
            onClick={button.onClick}
          />

        ))}
      </div>

    </div>
  );
}