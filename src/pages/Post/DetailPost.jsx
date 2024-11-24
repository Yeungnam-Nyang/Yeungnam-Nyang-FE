import NavBar from "../../components/common/NavBar";
import Header from "../../components/common/Header";
import Title from "../../components/common/Title";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";
import DetailPostHeader from "../../components/post/DetailPostHeader";
import { FaPen } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdDateRange } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import DetailPostImage from "../../components/post/DetailPostImage";
import DetailPostContent from "../../components/post/DetailPostContent";
import DetailPostComment from "../../components/post/DetailPostComment";
import DetailPostCommentInput from "../../components/post/DetailPostCommentInput";
import api from "../../api/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useCommentInputStore } from "../../store/commentInputStore";
import StopWatch from "../../components/post/StopWatch";
export default function DetailPost() {
  //zustand에서 input값 가져오기
  const { inputText, clearInputText } = useCommentInputStore();
  const { id } = useParams();
  const queryClient = useQueryClient();
  //post정보 리액트 쿼리로 가져오기
  const {
    data: postData,
    isLoading: postLoading,
    isError: postError,
  } = useQuery(["post", id], () =>
    api.get(`/api/post/${id}`).then((res) => res.data)
  );

  //하단 댓글쓰기 인풋
  const isInputOpen = useCommentInputStore((state) => state.isInputOpen);
  const toggleInput = useCommentInputStore((state) => state.toggleInput);

  //로딩중인 경우
  const [loading, setLoading] = useState(null);
  //에러 발생인 경우
  const [error, setError] = useState(null);
  //유저 아이디
  const [userId, setUserId] = useState(null);
  const getUserId = async () => {
    await api.get("/api/me").then((data) => setUserId(data.data));
  };

  //리액트 쿼리 키값 저장
  const {
    data,
    isLoading: commentLoading,
    isError: commentError,
  } = useQuery(["comments", id], () =>
    api.get(`/api/comment/post/${id}`).then((res) => res.data)
  );

  //mutation 설정
  const { mutate } = useMutation({
    //댓글 작성
    mutationFn: ({ content }) =>
      api.post("/api/comment/add", { content: content, postId: id }),

    //mutation발생시
    onMutate: async ({ content }) => {
      //기존 comment 저장
      const prevComments = queryClient.getQueryData(["comments", id]);
      queryClient.setQueryData(["comments", id], (old) => [
        {
          userId: userId,
          content: content,
          commentId: Math.random() * Infinity,
          commentDate: new Date().toISOString(),
        },
        ...old,
      ]);

      //post의 댓글 수
      const prevPost = queryClient.getQueryData(["post", id]);
      queryClient.setQueryData(["post", id], (old) => {
        return {
          ...old,
          commentCnt: old.commentCnt + 1,
        };
      });
      return { prevComments, prevPost };
    },

    onError: (error, newComment, context) => {
      queryClient.setQueryData(["comments", id], context.prevComments);
      queryClient.setQueryData(["post", id], context.prevPost);
    },
    //오류 또는 성공 후 refetch
    onSettled: () => {
      queryClient.invalidateQueries(["comments", id]);
      queryClient.invalidateQueries(["post", id]);
    },
  });

  const writeComment = () => {
    mutate({ content: inputText });
    clearInputText();
  };

  useEffect(() => {
    setLoading(postLoading || commentLoading);
    setError(commentError || postError);
  }, [commentError, postError, postLoading, commentLoading]);

  useEffect(() => {
    getUserId();
  }, []);

  const str = postData?.postDate.substring(0, 10);
  return (
    <div className="pb-24">
      <Header />
      <div className="h-20"></div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <>
          <Title text={"POST"} />
          <div className="gap-3 flex items-center px-4 py-1">
            <MdDateRange size={25} />
            <p className=" font-bold text-zinc-500">{str}</p>
          </div>
          <div className="gap-3 flex items-center px-4 py-1">
            <FaLocationDot size={25} />
            <p className="font-bold text-zinc-500">{postData?.address}</p>
          </div>
          <DetailPostHeader postData={postData} />
          <DetailPostImage postData={postData} />
          <hr className="bg-white h-1 w-[95%] mx-auto my-5" />
          <DetailPostContent postData={postData} />
          <StopWatch postId={postData?.postId} />
          <div className="flex justify-between pb-8">
            <Title text={"COMMENT"} />
            <button
              onClick={() => toggleInput()}
              className="hover:scale-125 duration-500 px-5"
            >
              <FaPen size={25} color="#000000" />
            </button>
          </div>
          <DetailPostComment commentData={data} postId={id} />
        </>
      )}
      {isInputOpen ? (
        <DetailPostCommentInput
          postId={postData?.postId}
          onClick={writeComment}
        />
      ) : (
        <NavBar />
      )}
    </div>
  );
}
