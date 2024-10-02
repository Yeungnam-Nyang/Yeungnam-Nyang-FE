import React from 'react';
import logo from '../../assets/images/logo-big.png'; // 로고 이미지 경로

const logoStyle = {
  width: '200px',
  marginTop: '10%',
  };
const Logo = () => {
  return (
    <img src={logo} alt="Logo" style={logoStyle} />
  );
};

export default Logo;