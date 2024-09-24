import axios from "axios";
import { useState } from "react";

export default function SignUpTest() {
  const [school, setSchool] = useState("");
  const [studentNum, setStudentNum] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [departmentName, setDepartmentName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("schoolName", school);
    formData.append("studentNumber", studentNum);
    formData.append("studentName", name);
    formData.append("userId", id);
    formData.append("userPassword", password);
    formData.append("userPhoneNumber", phone);
    formData.append("userQuestion", question);
    formData.append("userAnswer", answer);
    formData.append("departmentName", departmentName);
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
  }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withXSRFToken: true,
        }
      );

      if (response.status === 200) {
        console.log("회원가입 성공");
        // 성공 시 추가적인 처리
      } else {
        console.error("회원가입 실패");
      }
    } catch (error) {
      console.error("상세 오류 정보:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
        response: error.response
          ? {
              data: error.response.data,
              status: error.response.status,
              headers: error.response.headers,
            }
          : "No response",
        request: error.request
          ? "Request was made but no response was received"
          : "No request",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="학교명"
        value={school}
        onChange={(e) => setSchool(e.target.value)}
      />
      <input
        placeholder="학번"
        value={studentNum}
        onChange={(e) => setStudentNum(e.target.value)}
      />
      <input
        placeholder="학과"
        value={departmentName}
        onChange={(e) => setDepartmentName(e.target.value)}
      />
      <input
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        placeholder="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        placeholder="휴대폰번호"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <select value={question} onChange={(e) => setQuestion(e.target.value)}>
        <option value="">보안 질문 선택</option>
        <option value="당신이 태어난 도시의 이름은 무엇입니까?">
          당신이 태어난 도시의 이름은 무엇입니까?
        </option>
        <option value="당신의 첫 번째 학교 이름은 무엇입니까?">
          당신의 첫 번째 학교 이름은 무엇입니까?
        </option>
        <option value="당신이 가장 좋아하는 음식은 무엇입니까?">
          당신이 가장 좋아하는 음식은 무엇입니까?
        </option>
        <option value="당신의 첫 번째 애완동물 이름은 무엇입니까?">
          당신의 첫 번째 애완동물 이름은 무엇입니까?
        </option>
        <option value="당신의 어머니의 이름은 무엇입니까?">
          당신의 어머니의 이름은 무엇입니까?
        </option>
      </select>
      <input
        placeholder="답변"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button type="submit">회원가입</button>
    </form>
  );
}
