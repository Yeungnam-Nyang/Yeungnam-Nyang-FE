import { useState, useEffect, useRef } from "react";
import { FaCamera } from "react-icons/fa";
import "./MyProfile.css";
import Button from "../../components/common/Button";
import Header from "../../components/common/Header";
import NavBar from "../../components/common/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MyProfile() {
  const API_URL = import.meta.env.VITE_SERVER_URL;
  const defaultProfileImage =
    import.meta.env.VITE_PUBLIC_URL + "/assets/images/default_profile_gray.png"; // 기본 이미지 경로 설정
  const PUBLIC_URL=import.meta.env.VITE_PUBLIC_URL;
  const [userId, setuserId] = useState("");
  const [profileURL, setprofileURL] = useState(defaultProfileImage); // 기본 이미지 설정
  const [schoolName, setschoolName] = useState("");
  const [studentName, setstudentName] = useState("");
  const [departmentName, setdepartmentName] = useState("");
  const [error, setError] = useState(null); // 오류 메시지 상태 추가
  const fileInputRef = useRef(null); // 파일 입력창 참조

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setuserId(response.data.userId);
        setprofileURL(response.data.profileURL && response.data.profileURL !== "null"
            ? response.data.profileURL
            : defaultProfileImage); // 프로필 URL 설정 (없으면 기본 이미지 사용)
        setschoolName(response.data.schoolName);
        setdepartmentName(response.data.departmentName);
        setstudentName(response.data.studentName);
      } catch (error) {
        console.error("프로필 정보를 가져오는데 실패:", error);
        setError("프로필 정보를 가져오는 데 문제가 발생했습니다."); // 오류 메시지 설정
      }
    };
    fetchProfileData();
  }, [API_URL]);

  const nav = useNavigate();

  // 로그아웃
  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      nav("/"); // 홈 화면으로 이동
      localStorage.removeItem("token"); // 토큰 삭제
    }
  };

  const handleProfileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("imageFile", file);
    try {
      await axios.put(`${API_URL}/api/user/profile/image-update`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      // 최신 프로필 데이터 가져오기
      const response = await axios.get(`${API_URL}/api/user/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setprofileURL(response.data.profileURL);
    } catch (error) {
      console.error("프로필 사진 업데이트 실패:", error);
      alert("프로필 사진 업데이트 중 오류가 발생했습니다.");
    }
  };
  return (
    <div className="my-profile-container">
      <Header />
      <div className="profile-header">
        <img src={`${PUBLIC_URL}/assets/images/icon_pow.png`} alt="Icon" className="profile-icon " />
        <h2 className="profile-title">MY PROFILE</h2>
      </div>

      <div className="profile-img profile-image-container">
        {/* 프로필 이미지 */}
        <img
          src={profileURL}
          alt="Profile"
          className="profile-image"
          key={profileURL}
        />
        <button
          className="profile-change-button"
          onClick={() => fileInputRef.current.click()} // 파일 입력창 열기
        >
          <FaCamera />
        </button>
        {/* 숨겨진 파일 입력창 */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleProfileChange}
        />
      </div>

      {/* 오류 메시지 출력 */}
      {error && <div className="error-message">{error}</div>}

      <h3 className="info-title">학교명</h3>
      <div className="profile-info">{schoolName || "정보 없음"}</div>
      <h3 className="info-title">학과명</h3>
      <div className="profile-info">{departmentName || "정보 없음"}</div>
      <h3 className="info-title">이름</h3>
      <div className="profile-info">{studentName || "정보 없음"}</div>

      <div className="button-group">
        <Button
          text="내가 저장한 게시물"
          isValid={true}
          onClick={() => nav("/profile/mycat")}
        />
        <Button
          text="로그아웃"
          isValid={true}
          onClick={handleLogout}
        />
      </div>
      <NavBar />
    </div>
  );
}
