import Button from "../../components/common/Button";
import Header from "../../components/common/Header";
import NavBar from "../../components/common/NavBar";
import Title from "../../components/common/Title";
import { MdAddPhotoAlternate } from "react-icons/md";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import { useEffect } from "react";
import { useState } from "react";
export default function WritePost() {
  const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
    maximumAge: 1000 * 3600 * 24, // 24 hour
  };

  const { location, error } = useGeoLocation(geolocationOptions);
  //위치 값으로 위도 , 경도 전송해야 함

  const [city, setCity] = useState("");

  //버튼 클릭 유효성 검사
  const [isValide, setValid] = useState(false);

  return (
    <>
      <Header />
      <div className="h-20"></div>
      <Title text="POST" />
      {error ? null : <div>{city}</div>}
      <form>
        <div className="flex w-11/12 bg-white h-[600px] m-auto rounded-3xl shadow-xl">
          <button className="my-0 mx-auto">
            <MdAddPhotoAlternate size={60} />
          </button>
        </div>
        <section className="w-11/12 m-auto space-y-4 mt-4">
          <div className="flex gap-4 items-center ">
            <h2 className="font-['Bungee'] text-2xl">NAME</h2>
            <input
              type="text"
              placeholder="고양이 이름을 입력하세요."
              className="p-3 text-slate-400 rounded-3xl shadow-lg mx-3"
            ></input>
          </div>
          <div className="flex gap-4 items-center">
            <h2 className="font-['Bungee'] text-2xl">DES</h2>
            <textarea
              type="text"
              className="p-3 text-slate-400 rounded-3xl shadow-lg mx-3"
              placeholder="고양이를 설명해주세요."
            ></textarea>
          </div>
          <div className="flex gap-4 items-center">
            <h2 className="font-['Bungee'] text-2xl">LOC</h2>
            <div>
              <input
                className="p-3 text-slate-400 rounded-3xl shadow-lg"
                placeholder="위치를 입력하세요."
              />
              <button className="place-items-end absolute">검색</button>
            </div>
          </div>
        </section>
        <Button type={"submit"} text={"등록하기"} isValid={isValide} />
      </form>
      <NavBar />
    </>
  );
}
