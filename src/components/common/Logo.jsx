import React from "react";

const logoStyle = {
  width: "200px",
  marginTop: "10%",
};
const Logo = () => {
  return (
    <img
      src={`${import.meta.env.VITE_PUBLIC_URL}/assets/images/logo-big.png`}
      alt="Logo"
      style={logoStyle}
    />
  );
};

export default Logo;
