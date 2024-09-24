import {
  Map,
  MapTypeControl,
  ZoomControl,
  MapMarker,
} from "react-kakao-maps-sdk";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import { useCallback, useEffect, useRef, useState } from "react";
import Error from "../common/Error";
import Marker from "../../assets/images/marker.png";
import { io } from "socket.io-client";
export default function KakoMap() {
  //현재 위치 가져오기
  const { location, error, getLocation } = useGeoLocation();
  //socket
  const [socket, setSocket] = useState(null);
  //불러온 고양이 게시물
  const [catPosts, setCatPosts] = useState([]);

  //현재 위치 소켓으로 서버 전송
  const sendLocationToServer = useCallback(
    (lat, lng) => {
      if (socket) {
        socket.emit("updateLocation", { latitude: lat, longitude: lng });
      }
    },
    [socket]
  );

  //마운트 시 소켓 연결
  useEffect(() => {
    const newSocket = io("http://backend");
    setSocket(newSocket);

    newSocket.on("nearCatPosts", (post) => {
      setCatPosts(post);
    });

    //컴포넌트 언마운트 시 소켓 해제
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    const updateLocation = async () => {
      await getLocation();
      if (location) {
        sendLocationToServer(location.latitude, location.longitude);
      }
    };
    updateLocation();
    const intervalId = setInterval(updateLocation, 3000);

    return () => clearInterval(intervalId);
  }, [getLocation, location, sendLocationToServer]);

  if (error) {
    return <Error />;
  }

  const defaultLocation = { lat: 35.8264595, lng: 128.754132 };

  //   TODO
  // 소켓을 통해서 실시간 위치 계속 받아오기
  return (
    <div className="py-10">
      <Map
        center={
          location
            ? { lat: location.latitude, lng: location.longitude }
            : defaultLocation
        }
        style={{ width: "100%", height: "40rem", borderRadius: "1rem" }}
        level={2}
      >
        <MapTypeControl position={"TOPRIGHT"} />
        <ZoomControl position={"RIGHT"} />
        {/* 현재 위치 마커 생성 */}
        {location && (
          <MapMarker
            position={{ lat: location.latitude, lng: location.longitude }}
            image={{
              src: `${Marker}`,
              size: {
                width: 64,
                height: 69,
              },
            }}
          ></MapMarker>
        )}
        {catPosts.map((post, idx) => (
          <MapMarker
            key={idx}
            position={{ lat: post.latitude, lng: post.longitude }}
          ></MapMarker>
        ))}
      </Map>
    </div>
  );
}
