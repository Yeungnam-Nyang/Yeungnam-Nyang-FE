const getAddressApi = async ({ location }) => {
  return new Promise((resolve, reject) => {
    let geocoder = new kakao.maps.services.Geocoder();
    let coord = new kakao.maps.LatLng(location.latitude, location.longitude);

    let callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const roadAddress = result[0].road_address
          ? result[0].road_address.address_name // 도로명 주소
          : result[0].address.address_name; // 지번 주소 (대체)
        resolve(roadAddress);
      } else {
        reject("Failed to get address");
      }
    };

    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  });
};

export default getAddressApi;
