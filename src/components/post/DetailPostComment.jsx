import defaultProfile from "../../assets/images/profile_default.png";
import { BiSolidLike } from "react-icons/bi";

export default function DetailPostComment({ commentData }) {
  return (
    <div className="px-6 py-2">
      {commentData?.map((comment, idx) => (
        <div key={idx} className="flex">
          <div className="justify-between">
            <div>
              <img
                src={
                  comment.userProfilUrl ? comment.userProfilUrl : defaultProfile
                }
                alt={`유저 프로필-${idx}`}
                className="w-10 h-10 rounded-full mr-3"
              />
              <p className="font-bold">{commentData?.userId}</p>
              <p>{commentData?.content}</p>
            </div>
            <div>
              {/* 좋아요 */}
              <BiSolidLike size={25} className="custom-hover" />
              <p className="font-bold">{commentData?.likeCnt}</p>
            </div>
          </div>
          <hr className="bg-slate-400 h-1 w-[95%] mx-auto my-5" />
        </div>
      ))}
    </div>
  );
}
