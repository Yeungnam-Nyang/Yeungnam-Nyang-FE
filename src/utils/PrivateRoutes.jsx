import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  //토큰이 있으면 로그인 상태 유지
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};
export default PrivateRoutes;
