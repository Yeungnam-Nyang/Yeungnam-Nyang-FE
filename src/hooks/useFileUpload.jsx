import { useState } from "react";
import api from "../api/api";
import axios from "axios";

const useFileUpload = () => {
  //파일 저장 배열
  const [files, setFiles] = useState([]);

  //에러
  const [error, setError] = useState(null);
  //파일 올리는 함수
  const onSaveFiles = (uploadFiles) => {
    //이미지는 5개까지
    if (uploadFiles.length + files.length > 5) {
      alert("이미지는 최대 5개까지 업로드 가능합니다.");
      return;
    }
    setFiles((prevFiles) => [...prevFiles, ...uploadFiles]);
  };

  const onFileUpload = async (postRequestDTO) => {
    const formData = new FormData();
    files.forEach((file) => {
      //파일데이터 저장
      formData.append("files", file);
    });

    formData.append(
      "postRequestDTO",
      new Blob([JSON.stringify(postRequestDTO)], {
        type: "application/json",
      })
    );

    try {
      const serverUrl = import.meta.env.VITE_SERVER_URL;
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${serverUrl}/api/post/write`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // multipart/form-data 형식 지정
            Authorization: `Bearer ` + token,
          },
        }
      );
      alert("게시물 작성 완료!");

      return response;
    } catch (err) {
      alert("게시물 작성 실패");
      console.error(err);
      setError(err);
    }
  };
  return { files, onSaveFiles, onFileUpload, error };
};

export default useFileUpload;
