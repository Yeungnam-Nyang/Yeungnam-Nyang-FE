import React, { useState } from "react";
import Logo from "../../components/common/Logo";
import Button from "../../components/common/Button";
import "./EditProfile.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Wrapper from "../../components/common/Wrapper";

export default function EditProfile2() {
  const [showPassword, setShowPassword] = useState(false);
  const [Pw, setPw] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState("");

  const questions = [
    "당신이 태어난 도시의 이름은 무엇입니까?",
    "당신의 첫 번째 학교 이름은 무엇입니까?",
    "당신이 가장 좋아하는 음식은 무엇입니까?",
    "당신의 첫 번째 애완동물 이름은 무엇입니까?",
    "당신의 어머니의 이름은 무엇입니까?",
  ];

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handlePhone = (e) => setPhone(e.target.value);
  const handleSendCertification = () => {
    // 인증번호 발송 로직
  };
  const handleVerifyCertification = () => {
    // 인증번호 확인 로직
  };
  const [Phone, setPhone] = useState("");
  const [isCertificationSent, setIsCertificationSent] = useState(false);
  const [securityAnswer, setSecurityAnswer] = useState("");

  return (
    <Wrapper>
      <div className="EditProfile-container">
        <Logo />
        <div className="Edit-title">EDIT</div>

        <div className="certification">
          <div className="input-container">
            <input type="text" className="Phone" />
            <button type="button" className="sendCertification">
              중복 확인
            </button>
          </div>
        </div>

        <div className="PW-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력하세요."
            value={Pw}
            onChange={(e) => setPw(e.target.value)}
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
        <div className="certification">
          <div className="input-container">
            <input
              type="text"
              placeholder="휴대폰 번호를 입력하세요.(숫자만)"
              value={Phone}
              onChange={handlePhone}
              className="Phone"
            />
            <button
              type="button"
              className="sendCertification"
              onClick={handleSendCertification}
            >
              인증번호
            </button>
          </div>
        </div>

        {isCertificationSent && (
          <div className="certification">
            <div className="input-container">
              <input
                type="text"
                placeholder="인증번호를 입력하세요."
                className="Phone"
              />
              <button
                type="button"
                className="sendCertification"
                onClick={handleVerifyCertification}
              >
                인증 확인
              </button>
            </div>
          </div>
        )}

        <select
          className="Select"
          value={selectedQuestion}
          onChange={(e) => setSelectedQuestion(e.target.value)}
        >
          <option value="">질문을 선택하세요</option>
          {questions.map((question, index) => (
            <option key={index} value={question}>
              {question}
            </option>
          ))}
        </select>

        <input placeholder="답변" className="input-field" />

        <Button text="다음" />
      </div>
    </Wrapper>
  );
}
