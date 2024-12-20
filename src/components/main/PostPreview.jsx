import { BiSolidLike } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Loading from "../common/Loading.jsx";
import Error from "../common/Error.jsx";

export default function PostPreview({ postData }) {
  //댓글 불러오기
  const {
    data: commentData,
    isLoading: commentLoading,
    error: commentError,
  } = useFetch(`/api/comment/post/${postData?.postId}`);

  const nav = useNavigate();

  const userId=localStorage.getItem("userId");
    // 경로 판단
    const path =
        userId === postData?.userId
            ? "/profile"
            : `/friend/profile?friendId=${postData?.userId}`;



  if(commentError) return <Error/>
  if(commentLoading) return <Loading/> 

  return (
    <div className="flex flex-start flex-col p-3">
      {/* 프로필 */}
      <section className="flex flex-row gap-4  items-center py-4 cursor-pointer" onClick={()=>nav(path)}>
        <img
          alt="profile_img"
          src={
              postData?.profileUrl && postData.profileUrl !== "null"
                  ? postData.profileUrl // 유효한 프로필 URL
                  : `${
                      import.meta.env.VITE_PUBLIC_URL
                  }/assets/images/profile_default.png`
          }
          className="rounded-full w-10 h-auto bg-white"
        />
        <p className="flex text-2xl font-bold">{postData?.userId}</p>
      </section>

      {/* 게시물 사진 */}
      <section
        className="flex flex-col  cursor-pointer shadow-lg rounded-3xl"
        onClick={() => nav(`/post/${postData?.postId}`)}
      >
        <div className="rounded-3xl bg-white  align-middle">
          <img
            src={postData ? `${postData.pictureUrl[0]}` : null}
            alt="post-picture"
            className="rounded-3xl m-auto mt-5"
          />
          <div className="m-auto flex gap-3 p-4">
              {commentLoading?<Loading/>:commentError?<Error/>:(commentData && commentData.length > 0 ? (
                  <>
                      <img
                          alt="comment-profile.img"
                          src={commentData[0]?.profileUrl && commentData[0].profileUrl !== "null"
                              ? commentData[0].profileUrl // 유효한 프로필 URL
                              : `${
                                  import.meta.env.VITE_PUBLIC_URL
                              }/assets/images/profile_default.png`}
                          className="rounded-full w-6 bg-black"
                      />
                      <p>{commentData[0].userId}</p>
                      <p>{commentData[0].content}</p>
                  </>
              ) : null)}
          </div>
        </div>
      </section>

      {/* 좋아요, 댓글 */}
      <section className="flex gap-3 mt-6">
        {/* 좋아요 */}
        <BiSolidLike size={25} className="custom-hover" />
        <p className="font-bold">{postData?.likeCnt}</p>
        {/* 댓글 */}
        <FaCommentAlt size={25} />
        <p className="font-bold">{postData?.commentCnt}</p>
      </section>
    </div>
  );
}
