import Button from "../../components/common/Button";
import Header from "../../components/common/Header";
import NavBar from "../../components/common/NavBar";
import Title from "../../components/common/Title";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useFileUpload from "../../hooks/useFileUpload";
import { useEffect, useRef } from "react";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import getAddressApi from "../../utils/getAddressApi";
import { useNavigate } from "react-router-dom";
import useLocationPermission from "../../hooks/useLocationPermission";
export default function WritePost() {
  //게시물 작성 완료 시 이전 페이지 이동
  const nav = useNavigate();
  const goToBack = () => {
    nav(-1);
  };
  //버튼 클릭 유효성 검사
  const [isValid, setValid] = useState(false);
  //위치불러오기
  const [requestLocation, setRequestLocation] = useState(true);
  //위치 정보
  const [userLocation, setUserLocation] = useState("");
  //이미지 미리보기 위한 이미지 상태 저장
  const [imgFiles, setImgFiles] = useState([]);
  //위치정보 허용유무
  const { isLocationAllowed } = useLocationPermission();

  //useForm 라이브러리 사용
  const {
    register,
    formState: { errors, isValid: formValid },
    handleSubmit,
  } = useForm();
  const inputFileRef = useRef(null);

  //위치 정보 가져오기
  const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 10,
    maximumAge: 1000 * 3600 * 24,
  };
  const {
    location,
    error: locationError,
    getLocation,
  } = useGeoLocation(geolocationOptions);

  //주소 저장

  //파일 업로더 생성
  const {
    files,
    onSaveFiles,
    onFileUpload,
    error: uploadError,
  } = useFileUpload("post");

  //입력값 모니터링
  useEffect(() => {
    //일단 직접 입력값 받는 고양이 이름, 내용
    setValid(
      !uploadError &&
        !errors.catName &&
        !errors.content &&
        !locationError &&
        files.length > 0 &&
        formValid
    );
  }, [errors, locationError, files, uploadError, formValid]);

  const onSubmit = async (data) => {
    try {
      const formData = {
        content: data.content,
        catName: data.catName,
        latitude: Number(location?.latitude),
        longitude: Number(location?.longitude),
        address: userLocation,
      };

      const response = await onFileUpload(formData);
      if (response && response.status === 200) {
        goToBack();
      }
    } catch (error) {
      alert("게시물 작성 실패", error);
    }
  };

  //위치 불러오기 버튼 클릭 시
  const onhandleLocation = async (e) => {
    e.preventDefault();
    setRequestLocation(true);

    await getLocation(); // 위치 가져오기 시도
  };
  // 위치 정보가 업데이트될 때 주소를 가져오도록 useEffect 설정
  useEffect(() => {
    const fetchAddress = async () => {
      if (location) {
        const address = await getAddressApi({ location });
        setUserLocation(address);
      }
    };
    fetchAddress();
  }, [location]); // location 상태가 업데이트될 때마다 실행

  const handleFileUpload = (event) => {
    event.preventDefault();
    const files = Array.from(event.target.files);

    if (files.length > 0) {
      // 수정된 부분: 미리보기 배열 업데이트
      const imageUrlLists = files.map((file) => URL.createObjectURL(file)); // 파일 URL 생성
      setImgFiles((prev) => [...prev, ...imageUrlLists]); // 기존 미리보기와 결합
      onSaveFiles(files); // 선택된 파일을 저장
    } else {
      alert("파일이 선택되지 않았습니다.");
    }
  };

  //x버튼 클릭 시 이미지 삭제
  const handelDeleteImage = (id) => {
    setImgFiles(imgFiles.filter((_, index) => index !== id));
  };

  const handleCustomFileClick = () => {
    inputFileRef.current.click();
  };
  return (
    <div className="pb-24">
      <Header />
      <div className="h-20"></div>
      <Title text="POST" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center w-11/12 bg-white h-auto m-auto rounded-3xl ">
          {imgFiles.length > 0 ? (
            <div>
              {imgFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center p-10 relative"
                >
                  <img
                    className="w-full h-auto object-cover rounded"
                    src={file}
                    alt={`이미지 미리보기-${idx}`}
                  />
                  <IoIosCloseCircle
                    size={25}
                    color="red"
                    onClick={() => handelDeleteImage(idx)}
                    className="absolute top-12 right-12 cursor-pointer"
                  >
                    X
                  </IoIosCloseCircle>
                </div>
              ))}

              <CiCirclePlus
                className="my-auto mx-auto mb-4 cursor-pointer"
                size={60}
                type="button"
                onClick={handleCustomFileClick}
              />
              <input
                ref={inputFileRef}
                className="hidden"
                type="file"
                accept="image/jpg, image/png, image/jpeg"
                multiple
                onChange={handleFileUpload}
              />
            </div>
          ) : (
            <div className="flex w-11/12 bg-white h-[600px] m-auto rounded-3xl ">
              <div className="my-auto mx-auto">
                <MdAddPhotoAlternate
                  className="cursor-pointer"
                  size={60}
                  type="button"
                  onClick={handleCustomFileClick}
                />
              </div>

              <input
                ref={inputFileRef}
                className="hidden"
                type="file"
                accept="image/jpg, image/png, image/jpeg"
                multiple
                onChange={handleFileUpload}
              />
            </div>
          )}
        </div>
        <section className="w-11/12 m-auto space-y-4 mt-4 mb-14">
          <div className="flex gap-4 items-center ">
            <label className="font-['Bungee'] text-2xl">NAME</label>
            <input
              id="catName"
              type="text"
              placeholder="고양이 이름을 입력하세요."
              className=" text-sm p-3 w-11/12 ml-0 text-black rounded-3xl shadow-lg mx-auto"
              {...register("catName", {
                minLength: {
                  value: 1,
                  message: "1자리 이상 고양이 이름을 입력해 주세요.",
                },
                required: "필수 입력 칸입니다.",
              })}
            ></input>
          </div>
          <div className="flex gap-7 items-center">
            <label className="font-['Bungee'] text-2xl pr-6">DES</label>
            <textarea
              type="text"
              className="text-sm p-3 h-32 w-11/12 ml-0 text-black rounded-3xl shadow-lg resize-none"
              placeholder="고양이를 설명해주세요."
              {...register("content", {
                minLength: {
                  value: 1,
                  message: "1자리 이상 내용을 작성해 주세요.",
                },
                required: "필수 입력 칸입니다.",
              })}
            ></textarea>
          </div>
          <div className="flex gap-7 items-center">
            <label className="font-['Bungee'] text-2xl pr-6">LOC</label>
            <div className="w-full">
              {/* 유저의 위치정보 허용여부 체크중 */}
              {isLocationAllowed === null && (
                <div className=" w-full ml-0 text-black">
                  위치 권한확인중...
                </div>
              )}

              {/* 유저의 위치정보 허용이 안되었을 떄 */}
              {isLocationAllowed === false && (
                <div className=" w-full ml-0 text-red-600">
                  위치 권한이 거부되었습니다. 설정에서 위치 권한을 허용해주세요.
                </div>
              )}

              {/* 유저의 위치정보 허용이 된 상태일 경우 */}
              {isLocationAllowed === true && (
                <div className="text-sm p-3 w-full ml-0 text-slate-400 rounded-3xl shadow-lg bg-white flex justify-between items-center">
                  {userLocation === null
                    ? "'위치 가져오기'버튼을 클릭해주세요."
                    : `${userLocation}`}
                  <button
                    className="text-sm flex rounded-3xl bg-orange text-white p-1"
                    onClick={onhandleLocation}
                  >
                    위치 가져오기
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
        <Button type={"submit"} text={"등록하기"} isValid={isValid} />
      </form>
      <NavBar />
    </div>
  );
}
