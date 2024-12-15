const checkGeolocaionPermission = async () => {
  let message = "";

  const permission = await navigator.permissions.query({ name: "geolocation" });

  if (permission.state === "granted") {
    message = "granted";
  } else if (permission.state === "prompt") {
    message = "prompt";
  } else if (permission.state === "denied") {
    message = "denied";
    alert("위치 권한이 거부되었습니다. 설정에서 위치 권한을 허용해주세요.");
  }
  return  message ;
};
export default checkGeolocaionPermission;
