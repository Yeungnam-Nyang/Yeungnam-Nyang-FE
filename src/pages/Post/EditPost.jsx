import Header from "../../components/common/Header.jsx";
import Title from "../../components/common/Title.jsx";
import Error from "../../components/common/Error.jsx";
import Loading from "../../components/common/Loading.jsx";
import { IoIosCloseCircle } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import api from "../../api/api.jsx";
import { useGeoLocation } from "../../hooks/useGeoLocation.jsx";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import Button from "../../components/common/Button.jsx";
import useFileUpload from "../../hooks/useFileUpload.jsx";
import NavBar from "../../components/common/NavBar.jsx";
import getAddressApi from "../../utils/getAddressApi.js";
import Wrapper from "../../components/common/Wrapper.jsx";
export default function EditPost() {
  const { id } = useParams();
  //이미지
  const [images, setImages] = useState([]);
  const inputFileRef = useRef(null);
  const [userLocation, setUserLocation] = useState("");
  const nav = useNavigate();
  const [isValid, setValid] = useState(false);
  //해당 포스트 가져오기
  const {
    data: postData,
    isLoading: postLoading,
    isError: postError,
  } = useQuery(["post", id], () =>
    api.get(`/api/post/${id}`).then((res) => res.data)
  );

  //위치
  const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 10,
    maximumAge: 1000 * 3600 * 24,
  };
  const [prevLocation, setPrevLocation] = useState(false);
  const {
    location,
    error: locationError,
    getLocation,
  } = useGeoLocation(geolocationOptions);

  //현재 폼
  //useForm 라이브러리 사용
  const {
    register,
    formState: { errors, isValid: formValid },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    postData &&
      reset({
        catName: postData.catName || "",
        content: postData.content || "",
        address: postData.address || "",
      });
    setImages(postData?.pictureUrl);
    setUserLocation(postData?.address);
    setPrevLocation(true);
  }, [postData, reset]);
  //폼 제출
  const onSubmit = async (data) => {
    try {
      const formData = {
        content: data.content,
        catName: data.catName,
        latitude: Number(location?.latitude),
        longitude: Number(location?.longitude),
        address: userLocation,
      };

      const response = await onFileUpload(formData, "update");
      if (response && response.status === 200) {
        alert("게시물이 수정되었습니다.");
        nav(-1);
      }
    } catch (e) {
      alert("게시물 수정 실패했습니다.다시 시도 해주세요.");
      nav(-1);
    }
  };

  //위치 불러오기 버튼 클릭 시
  const onhandleLocation = async (e) => {
    e.preventDefault();

    await getLocation(); // 위치 가져오기 시도
    setUserLocation(false);
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

  //파일 업로더
  const {
    files,
    onSaveFiles,
    onFileUpload,
    error: uploadError,
  } = useFileUpload("update", id);

  //이미지 추가
  const handleFileUpload = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      const imageUrlLists = files.map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...imageUrlLists]);
      onSaveFiles(files);
    } else {
      alert("파일이 선택되지 않았습니다.");
    }
  };
  //이미지 삭제
  const handleDeleteImage = (id) => {
    setImages(images.filter((_, idx) => idx !== id));
  };

  const handleCustomFileClick = () => {
    inputFileRef.current.click();
  };
  //입력값 모니터링
  useEffect(() => {
    setValid(
      !uploadError &&
        !postError &&
        !errors.catName &&
        !errors.content &&
        !locationError &&
        images?.length > 0 &&
        formValid
    );
  }, [errors, locationError, images, uploadError, formValid, postError]);

  return (
    <Wrapper>
      <div className="pb-24">
        <Header />
        <div className="h-20"></div>
        <Title text={"EDIT"} />
        {!isValid ? (
          <Error />
        ) : postLoading ? (
          <Loading />
        ) : (
          postData && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col items-center w-11/12 bg-white h-auto m-auto rounded-3xl ">
                {/* 이미지 */}
                {images?.length > 0 ? (
                  <div>
                    {images?.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center p-10 relative"
                      >
                        {file instanceof File ? (
                          <img
                            alt={`이미지 미리보기-${idx}`}
                            className="w-full h-auto object-cover rounded"
                            src={URL.createObjectURL(file)}
                          />
                        ) : (
                          <img
                            alt={`이미지 미리보기-${idx}`}
                            className="w-full h-auto object-cover rounded"
                            src={file}
                          />
                        )}
                        <IoIosCloseCircle
                          size={25}
                          color="red"
                          onClick={() => handleDeleteImage(idx)}
                          className="absolute top-12 right-12 cursor-pointer"
                        />
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
                      type="file"
                      accept="image/jpg, image/png, image/jpeg"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
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

              {/* 텍스트 입력 */}
              <section className="w-11/12 m-auto space-y-4 mt-4 mb-14">
                <div className="flex gap-4 items-center">
                  <label className="font-['Bungee'] text-2xl">NAME</label>
                  <input
                    id="catName"
                    type="text"
                    placeholder="고양이 이름을 입력하세요."
                    className="text-sm p-3 w-11/12 ml-0 text-black rounded-3xl shadow-lg mx-auto"
                    {...register("catName", {
                      minLength: {
                        value: 1,
                        message: "1자리 이상 고양이 이름을 입력해 주세요.",
                      },
                      required: "필수 입력 칸입니다.",
                    })}
                  />
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
                    <div className="text-sm p-3 w-full ml-0 text-slate-400 rounded-3xl shadow-lg bg-white flex justify-between items-center">
                      {prevLocation ? userLocation : location}
                      <button
                        className="text-sm flex rounded-3xl bg-orange text-white p-1"
                        onClick={onhandleLocation}
                        type="button"
                      >
                        위치 가져오기
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* 제출 버튼 */}
              <Button type="submit" text="등록하기" isValid={formValid} />
            </form>
          )
        )}
        <NavBar />
      </div>
    </Wrapper>
  );
}
