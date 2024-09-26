import {
  Map,
  MapTypeControl,
  ZoomControl,
  MapMarker,
} from "react-kakao-maps-sdk";
import SockJS from "sockjs-client";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import { useEffect, useRef, useState } from "react";
import Error from "../common/Error";
import Marker from "../../assets/images/marker.png";
import CatMarker from "./CatMarker";
import { MdMyLocation } from "react-icons/md";
import { Client } from "@stomp/stompjs";
import Loading from "../common/Loading";

export default function KakoMap() {
  //현재 위치 가져오기
  const { location, error, getLocation } = useGeoLocation();
  const stompClient = useRef(null);
  //유저아이디 가져오기
  //const userId=localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);

  //임의의 userId
  const userId = "test1";
  //불러온 고양이 게시물
  const [catPosts, setCatPosts] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  //임시 토큰
  const token = import.meta.env.VITE_ACCESS_TOKEN;
  // 웹소켓 연결
  const connect = () => {
    const socket = new SockJS("http://localhost:8080/ws");
    console.log("Attempting to connect...");
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: function (str) {
        console.log("STOMP Debug: ", str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = function (frame) {
      console.log("Connected" + frame);
      setConnectionStatus("Connected");
      console.log("Subscribing to /sub/near-posts");

      client.subscribe("/sub/near-posts", function (message) {
        console.log("Received message: ", message.body);
        const userLocation = JSON.parse(message.body);
        setCatPosts(userLocation.posts);
      });
    };

    client.onStompError = function (frame) {
      console.log("Broker reported error: " + frame.headers["message"]);
      console.log("Additional details: " + frame.body);
      setConnectionStatus("Error: " + frame.headers["message"]);
    };
    client.onWebSocketError = function (event) {
      console.log("WebSocket Error: ", event);
      setConnectionStatus("WebSocket Error");
    };

    client.onWebSocketClose = function (event) {
      console.log("WebSocket Closed: ", event);
      setConnectionStatus("WebSocket Closed");
    };

    client.activate();
    stompClient.current = client;
  };
  //현재 위치 소켓으로 서버 전송
  const sendLocationToServer = () => {
    if (stompClient.current && stompClient.current.connected && location) {
      const locationObj = {
        latitude: location.latitude,
        longitude: location.longitude,
      };
      stompClient.current.publish({
        destination: "/pub/location",
        body: JSON.stringify(locationObj),
      });
    } else {
      console.error("WebSocket is not connected or location is not available");
    }
  };
  //소켓 연결 해제
  const disconnect = () => {
    if (stompClient.current && stompClient.current.deactivate) {
      stompClient.current.deactivate();
    }
  };

  //마운트 시 소켓 연결
  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  //현재위치 불러오기 버튼 클릭
  const onhandleGetLocation = async () => {
    setLoading(true);
    await getLocation();
    setLoading(false);
    // 위치가 null인지 확인
    if (location) {
      console.log(location);
      sendLocationToServer();
      const { latitude, longitude } = location || defaultLocation;
      console.log(latitude, longitude);
    } else {
      console.error("위치를 가져오는 데 실패했습니다.", error);
    }
  };
  
  if (error) {
    console.error("위치 오류:", error);
    return <Error />;
  }
  if (loading) {
    return <Loading />;
  }

  const defaultLocation = { lat: 35.8264595, lng: 128.754132 };

  //   TODO
  // 소켓을 통해서 실시간 위치 계속 받아오기

  return (
    <div className="py-10 relative">
      <div>Connection Status: {connectionStatus}</div>
      <Map
        center={
          location
            ? { lat: location.latitude, lng: location.longitude }
            : defaultLocation
        }
        style={{ width: "100%", height: "40rem", borderRadius: "1rem" }}
        level={1}
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
          <CatMarker key={idx} post={post} />
        ))}
      </Map>
      <MdMyLocation
        onClick={onhandleGetLocation}
        size={50}
        className="cursor-pointer z-20 absolute bottom-12 right-2"
      />
    </div>
  );
}
