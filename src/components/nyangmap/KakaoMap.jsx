import {
  Map,
  MapTypeControl,
  ZoomControl,
  MapMarker,
} from "react-kakao-maps-sdk";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import { useEffect } from "react";
import Error from "../common/Error";
import Marker from "../../assets/images/marker.png";
export default function KakoMap() {
  //현재 위치 가져오기
  const { location, error, getLocation } = useGeoLocation();
  useEffect(() => {
    getLocation();
  }, []);
  if (error) {
    return <Error />;
  }

  const defaultLocation = { lat: 35.8264595, lng: 128.754132 };
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
      </Map>
    </div>
  );
}
