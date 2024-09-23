import { useState } from "react";
import api from "../api/api";
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

    formData.append("postRequestDTO", JSON.stringify(postRequestDTO));
    
    try {
      const response = await api.post("/api/write/post", formData);
      console.log("파일 업로드 성공", response);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };
  return { files, onSaveFiles, onFileUpload, error };
};

export default useFileUpload;
