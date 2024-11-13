import {
  Map,
  MapTypeControl,
  ZoomControl,
  MapMarker,
} from "react-kakao-maps-sdk";

import { useGeoLocation } from "../../hooks/useGeoLocation";
import { useEffect, useState } from "react";
import Error from "../common/Error";
import Marker from "../../assets/images/marker.png";
import CatMarker from "./CatMarker";
import { MdMyLocation } from "react-icons/md";
import Loading from "../common/Loading";
import useFetch from "../../hooks/useFetch";
import { useCatMapPosts } from "../../store/useCatMapPosts";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
export default function KakoMap() {
  //고양이 게시물 개수 저장
  const { setPostsCount } = useCatMapPosts();
  //기본 위치 - lat, lng 형식으로 변경
  const defaultLocation = { lat: 35.8264595, lng: 128.754132 };
  //현재 위치 가져오기
  const { location, error: locationError, getLocation } = useGeoLocation();
  const [loading, setLoading] = useState(false);
  const [mapData, setMapData] = useState([]);
  const [error, setError] = useState(false);

  const nav = useNavigate();
  // 컴포넌트 마운트 시 현재 위치 가져오기
  useEffect(() => {
    const initializeLocation = async () => {
      try {
        setLoading(true);
        await getLocation();
        setLoading(false);
      } catch (err) {
        console.error("위치를 가져오는 데 실패했습니다.", err);
        setError(true);
        setLoading(false);
      }
    };
    initializeLocation();
  }, []);

  //현재위치 불러오기 버튼 클릭
  const onhandleGetLocation = async () => {
    setLoading(true);
    await getLocation();
    setLoading(false);
    // 위치가 null인지 확인
    if (location) {
      console.log(location);
      const { latitude, longitude } = location || defaultLocation;
      console.log(latitude, longitude);
    } else {
      console.error("위치를 가져오는 데 실패했습니다.", error);
    }
  };

  // useFetch 대신 useEffect 사용
  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await api(
          `/api/map?latitude=${
            location ? location.latitude : defaultLocation.lat
          }&longitude=${location ? location.longitude : defaultLocation.lng}`
        );
        setPostsCount(response.data.length);
        setMapData(response.data);
      } catch (err) {
        setError(true);
      }
    };

    fetchMapData();
  }, [location, setPostsCount]);

  if (locationError || error) {
    console.error("위치 오류:", error);
    return <Error />;
  }
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="py-10 relative">
      <Map
        center={
          location
            ? { lat: location.latitude, lng: location.longitude }
            : defaultLocation
        }
        style={{ width: "100%", height: "40rem", borderRadius: "1rem" }}
        level={3}
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
        {mapData.map((post, idx) => (
          <CatMarker
            key={idx}
            post={post}
            onClick={() => nav(`/post/${post.postId}`)}
          />
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