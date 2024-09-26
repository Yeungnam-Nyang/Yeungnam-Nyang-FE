import NavBar from "../../components/common/NavBar";
import Header from "../../components/common/Header";
import Title from "../../components/common/title";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";
import DetailPostHeader from "../../components/post/DetailPostHeader";
import axios from "axios";
import { FaPen } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailPostImage from "../../components/post/DetailPostImage";
import DetailPostContent from "../../components/post/DetailPostContent";
import DetailPostComment from "../../components/post/DetailPostComment";
import DetailPostCommentInput from "../../components/post/DetailPostCommentInput";
export default function DetailPost() {
  //데이터 가져오기
  //const {data,error,isLoading}=useFetch(`/api/post/${id}`);
  const { id } = useParams();
  //임시데이터
  const [postData, setPostData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [comment, setComment] = useState(null);

  //하단 댓글쓰기 인풋
  const [isInput, setIsInput] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/post${id}`);
        //const response2 = await axios.get(`http://localhost:3000/comment${id}`);
        setPostData(response.data);
        //setComment(response2.data);
        console.log(postData);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  return (
    <div className="pb-24">
      <Header />
      <div className="h-20"></div>
      <Title text={"POST"} />
      <DetailPostHeader postData={postData} />
      <DetailPostImage postData={postData} />
      <hr className="bg-white h-1 w-[95%] mx-auto my-5" />
      <DetailPostContent postData={postData} />
      <div className="flex justify-between">
        <Title text={"COMMENT"} />
        <button
          onClick={() => setIsInput(!isInput)}
          className="hover:scale-125 duration-500 px-5"
        >
          <FaPen size={25} color="#000000" />
        </button>
      </div>
      <DetailPostComment commentData={comment} />
      {isInput ? <DetailPostCommentInput /> : <NavBar />}
    </div>
  );
}
