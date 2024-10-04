import { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import useSound from "use-sound";
import catSound from "../../assets/sounds/cat.mp3";
import { useQueryClient } from "react-query";

export default function DetailPostContent({ postData }) {
  const [toggleLike, setToggleLike] = useState(false);
  //TODO 토클 좋아요 구현 - 좋아요한 게시물인지 유무API 존재해야함.
  const [posts, setPosts] = useState(postData);
  const queryClient = useQueryClient();
  //고양이 소리 효과음
  const [play] = useSound(catSound);
  const onClickToggleLike = () => {
    setToggleLike(!toggleLike);
    play();
  };

  return (
    <div className="flex flex-col p-5 gap-4">
      {/* 좋아요, 댓글 */}
      <section className="flex gap-3 mt-6">
        {/* 좋아요 */}
        {toggleLike ? (
          <AiFillLike
            size={25}
            className="custom-hover"
            onClick={onClickToggleLike}
          />
        ) : (
          <AiOutlineLike
            size={25}
            className="custom-hover"
            onClick={onClickToggleLike}
          />
        )}
        <p className="font-bold">{postData?.likeCnt}</p>
        {/* 댓글 */}
        <FaCommentAlt size={25} />
        <p className="font-bold">{postData?.commentCnt}</p>
      </section>
      <div className="bg-white rounded-3xl shadow-xl h-80 w-full p-4 ">
        {postData?.content}
      </div>
    </div>
  );
}
