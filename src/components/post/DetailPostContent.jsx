import { BiSolidLike } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";
export default function DetailPostContent({ postData }) {
  return (
    <div className="flex flex-col p-5 gap-4">
      {/* 좋아요, 댓글 */}
      <section className="flex gap-3 mt-6">
        {/* 좋아요 */}
        <BiSolidLike size={25} className="custom-hover" />
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
