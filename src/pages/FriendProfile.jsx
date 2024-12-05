import React, { useState, useEffect } from "react";
import IconPow from "/assets/images/icon_pow.png";
import IconCat from "/assets/images/Icon_cat.png";
import Header from "../components/common/Header";
import NavBar from "../components/common/NavBar";
import axios from "axios";
import "../pages/Profile/MyProfile.css";

export default function FriendProfile() {
  const API_URL=import.meta.env.VITE_SERVER_URL;
  const [profile, setProfile] = useState({
    profileImage: "",
    schoolName: "정보 없음",
    departmentName: "정보 없음",
    name: "정보 없음",
  });
  const [isLoading, setIsLoading] = useState(true);

  // friendId와 Authorization 설정
  const friendId = "timer973"; // 실제 friendId 값으로 대체 필요
  
  useEffect(() => {
    axios
      .get(`${API_URL}/friend/profile/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          friendId: friendId,
        },
      })
      .then((response) => {
        const { profileImage, schoolName, departmentName, name } = response.data;
        setProfile({ profileImage, schoolName, departmentName, name });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("프로필 데이터를 가져오는 중 오류 발생:", error);
        setIsLoading(false);
      });
  }, [API_URL]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
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
          <img src={profile.profileImage || IconPow} alt="Profile" className="profile-image" />
        </div>

        <div className="profile-image-container">
          <img src={IconCat} alt="Icon" className="cat-image" />
          <h2 className="catnumber">13마리 기록</h2>
        </div>

        <h3 className="info-title">학교명</h3>
        <div className="profile-info">{profile.schoolName}</div>
        <h3 className="info-title">학과명</h3>
        <div className="profile-info">{profile.departmentName}</div>
        <h3 className="info-title">이름</h3>
        <div className="profile-info">{profile.name}</div>

        <NavBar />
      </div>
    </>
  );
}
