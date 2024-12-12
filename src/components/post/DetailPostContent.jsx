import {  useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
import api from "../../api/api";

export default function DetailPostContent({ postData }) {
  const [post, setPost] = useState(postData);
  const queryClient = useQueryClient();

  //query설정
  const { mutate: toggleLike } = useMutation({
    //좋아요
    mutationFn: ({ postId }) =>
      api.post("/api/like/toggle", { postId: postId }),

    //mutation 발생 시
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries(["post", postId]);
      const previousPost = queryClient.getQueryData(["post", postId]);

      setPost((prevPost) => ({
        ...prevPost,
        likedByUser: !prevPost?.likedByUser,
        likeCnt: prevPost?.likedByUser
          ? prevPost.likeCnt - 1
          : prevPost.likeCnt + 1,
      }));

      return { previousPost };
    },

    onError: (error, newPost, context) => {
      setPost(context.previousPost);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["post", post?.postId]);
    },
  });

  const handleLikeClick = () => {
    toggleLike({ postId: post?.postId });
  };

  return (
    <div className="flex flex-col p-5 gap-4">
      {/* 좋아요, 댓글 */}
      <section className="flex gap-3 mt-6">
        {/* 좋아요 */}
        {post?.likedByUser ? (
          <AiFillLike
            size={25}
            className="custom-hover cursor-pointer"
            onClick={handleLikeClick}
          />
        ) : (
          <AiOutlineLike
            size={25}
            className="custom-hove cursor-pointer"
            onClick={handleLikeClick}
          />
        )}
        <p className="font-bold">{post?.likeCnt}</p>
        {/* 댓글 */}
        <FaCommentAlt size={25} />
        <p className="font-bold">{postData?.commentCnt}</p>
      </section>
      <div className="bg-white rounded-3xl shadow-xl h-80 w-full p-4 ">
        {post?.content}
      </div>
    </div>
  );
}
//////