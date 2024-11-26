import React, { useState } from "react";
import "./Login.css";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 처리 함수
  const handleLogin = async () => {
    if (id === "" || password === "") {
      alert("로그인 실패! 빈 칸이 있습니다.");
    } else {
      try {
        const response = await axios.post(`${serverUrl}/api/login`, {
          userId: id,
          userPassword: password,
        });
        

        // 성공적인 로그인 응답 시

        localStorage.setItem("token", response.data.token); // JWT 토큰 저장

        // 성공 후 홈 페이지로 이동
        nav("/");
      } catch (error) {
        // 로그인 실패 시 메시지
        console.error(error);
        alert("로그인 실패! ID 또는 비밀번호를 확인 해 주세요.");
      }
    }
  };

  const buttonConfigs = [
    { text: "ID 찾기", onClick: () => {} },
    { text: "비밀번호 찾기", onClick: () => {} },
    { text: "회원가입", onClick: () => {} },
  ];

  const nav = useNavigate();
  const paths = ["/login/findid", "/login/findpwd", "/signup1"];

  return (
    <>
      <div className="login-container">
        <img
          src={`${import.meta.env.VITE_PUBLIC_URL}/assets/images/logo-big.png`}
          alt="Logo"
          className="logo"
        />

        <h2 className="login-title">LOGIN</h2>

        <h2 className="text-id">ID:</h2>

        <input
          type="text"
          placeholder="ID를 입력해주세요."
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
          className="input-field"
        />

        <h2 className="text-pw">PW:</h2>

        <input
          type="password"
          placeholder="PW를 입력해주세요."
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="input-field"
        />

        <Button
          type="button"
          text="확인"
          isValid={true}
          onClick={handleLogin}
        />

        <div className="options">
          {buttonConfigs.map((button, index) => (
            <Button
              key={index}
              type="button"
              text={button.text}
              isValid={true}
              onClick={() => nav(paths[index])}
            />
          ))}
        </div>
      </div>
    </>
  );
}
