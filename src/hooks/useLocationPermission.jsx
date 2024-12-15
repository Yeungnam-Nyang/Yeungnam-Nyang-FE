import { useState, useEffect } from "react";

const useLocationPermission = () => {
  const [isLocationAllowed, setIsLocationAllowed] = useState(null); // 위치 권한 상태 (null: 확인 중, true: 허용, false: 거부)

  // 위치 권한 상태 확인
  const checkLocationPermission = async () => {
    try {
      const permission = await navigator.permissions.query({ name: "geolocation" });
      if (permission.state === "granted") {
        setIsLocationAllowed(true);
      } else {
        setIsLocationAllowed(false);
      }
    } catch (error) {

      setIsLocationAllowed(false);
    }
  };

  useEffect(() => {
    checkLocationPermission();
  }, []);

  return { isLocationAllowed };
};

export default useLocationPermission;
