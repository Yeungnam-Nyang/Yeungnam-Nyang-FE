import { useEffect } from "react";
import { useState } from "react";
import api from "../api/api";

const useFetch = (url) => {
  //데이터
  const [data, setData] = useState(null);
  //로딩 상태
  const [isLoading, setIsLoading] = useState(false);
  //에러 여부
  const [error, setError] = useState(null);
  //배열형태 데이터
  const [arrData, setArrData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.get(url);
        setData(response.data);
        setArrData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [url]);

  return { data, isLoading, error, arrData };
};

export default useFetch;
