import React, { useState, useEffect } from 'react';
import { FaCamera } from 'react-icons/fa';
import api from '../../api/api';  // 생성한 api 파일 import
import './MyProfile.css';
import iconPow from "../../assets/images/icon_pow.png";
import Button from "../../components/common/Button";
import Header from "../../components/common/Header";
import NavBar from "../../components/common/NavBar";
import { useNavigate } from 'react-router-dom';
export default function MyProfile() {
  /*const [userData, setUserData] = useState(null); // 사용자 정보를 저장할 상태

  useEffect(() => {
    // 프로필 데이터를 가져오는 함수
    const fetchProfileData = async () => {
      try {
        const response = await api.get("/api/myProfile"); // 사용자 프로필 정보 요청
        setUserData(response.data); // 프로필 정보를 상태에 저장
      } catch (error) {
        console.error("프로필 정보 가져오기 실패:", error);
      }
    };

    fetchProfileData(); // 컴포넌트가 마운트될 때 프로필 데이터 요청
  }, []);*/
  const [userData, setUserData] = useState({
    userId: "user1234",
    profileURL: "https://cdn.imweb.me/upload/S202210237dd2e135d7edd/c1e63d0f92ea8.jpg",
    schoolName: "서울대학교",
    departmentName: "컴퓨터공학과",
    studentName: "김도연"
  });
  const nav = useNavigate();
  return (
    <div className="my-profile-container">
      <Header />

      <div className="profile-header">
        <img src={iconPow} alt="Icon" className="profile-icon" />
        <h2 className="profile-title">MY PROFILE</h2>
      </div>
      
      <div className="profile-img profile-image-container">
  <img src={userData.profileURL} alt="Profile" className="profile-image" />
  <button className="profile-change-button">
    <FaCamera />
  </button>
</div>
      <h3 className='info-title'>학교명</h3>
      <div className='profile-info'>
        {userData.schoolName}
      </div>
      <h3 className='info-title'>학과명</h3>
      <div className='profile-info'>
        {userData.departmentName}
      </div>
      <h3 className='info-title'>이름</h3>
      <div className='profile-info'>
        {userData.studentName}
      </div>
      <div className="button-group">
        <Button text="수정하기" isValid={true}onClick={()=>nav('/profile/edit')}/>
        <Button text="내가 저장한 게시물" isValid={true} onClick={()=>nav('/profile/mycat')} />
        <Button text="로그아웃" />
      </div>
      <NavBar/>
    </div>
  );
}
