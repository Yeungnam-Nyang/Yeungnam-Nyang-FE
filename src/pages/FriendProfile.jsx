import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import IconPow from "/assets/images/icon_pow.png";
import IconCat from "/assets/images/Icon_cat.png";
import Header from "../components/common/Header";
import NavBar from "../components/common/NavBar";
import axios from "axios";
import "../pages/Profile/MyProfile.css";

export default function FriendProfile() {
  const API_URL = import.meta.env.VITE_SERVER_URL;
  const location = useLocation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    profileUrl: "",
    schoolName: "정보 없음",
    departmentName: "정보 없음",
    name: "정보 없음",
    postAmount: 0 ,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const defaultimage="../assets/images/profile_default.png";
  // 쿼리 파라미터에서 friendId 추출
  const friendId = new URLSearchParams(location.search).get("friendId");

  useEffect(() => {
    if (!friendId) {
      setError("유효하지 않은 친구 ID입니다.");
      setIsLoading(false);
      return;
    }

    axios
      .get(`${API_URL}/api/friend/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { friendId },
      })
      .then((response) => {
        const { profileUrl, schoolName, departmentName, name ,postAmount} = response.data;
        setProfile({ profileUrl, schoolName, departmentName, name ,postAmount});
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("프로필 데이터를 가져오는 중 오류 발생:", error);
        setError("프로필 데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.");
        setIsLoading(false);
      });
      
  }, [API_URL, friendId]);
  
  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  console.log(profile);
  return (
    <div className="my-profile-container">
      <Header />
      <div className="profile-header">
        <img src={IconPow} alt="Icon" className="profile-icon" />
        <div>
          <h2 className="profile-title">FRIEND</h2>
          <h2 className="profile-title">PROFILE</h2>
        </div>
      </div>
      <div className="profile-image-container">
  <img
    src={profile.profileUrl || defaultimage} // 기본 이미지 설정
    alt="Profile"
    className="profile-image"
    onError={(e) => (e.target.src = defaultimage)} // 이미지 로드 실패 시 기본 이미지 적용
  />
</div>

      <div className="profile-image-container">
        <img src={IconCat} alt="Icon" className="cat-image" />
        <h2 className="catnumber">{profile.postAmount}마리 기록</h2>
      </div>

      <h3 className="info-title">학교명</h3>
      <div className="profile-info">{profile.schoolName}</div>
      <h3 className="info-title">학과명</h3>
      <div className="profile-info">{profile.departmentName}</div>
      <h3 className="info-title">이름</h3>
      <div className="profile-info">{profile.name}</div>

      <NavBar />
    </div>
  );
}
