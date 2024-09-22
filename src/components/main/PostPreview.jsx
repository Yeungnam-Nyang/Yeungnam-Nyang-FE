import defalut from "../../assets/images/profile_default.png";
import example from "../../assets/images/ex01.jpeg";
import { BiSolidLike } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";
export default function PostPreview({postData}) {


  return (
    <div className="flex flex-start flex-col p-3">
      {/* 프로필 */}
      <section className="flex flex-row gap-4  items-center py-4 cursor-pointer">
        <img
          alt="profile_img"
          src={defalut}
          className="rounded-full w-10 h-auto bg-white"
        />
        <p className="flex text-2xl font-bold">사용자 아이디</p>
      </section>

      {/* 게시물 사진 */}
      <section className="flex flex-col  cursor-pointer shadow-lg rounded-3xl">
        <div className="rounded-3xl bg-white  align-middle">
          <img
            src={example}
            alt="example"
            className="rounded-3xl m-auto mt-5"
          />
          <div className="m-auto flex gap-3 p-4">
            <img src={defalut} className="rounded-full w-6 bg-black" />
            <p>tkv00 :</p>
            <p>고양이 귀여워!!</p>
          </div>
        </div>
      </section>

      {/* 좋아요, 댓글 */}
      <section className="flex gap-3 mt-6">
        {/* 좋아요 */}
        <BiSolidLike size={25} className="custom-hover" />
        <p className="font-bold">123</p>
        {/* 댓글 */}
        <FaCommentAlt size={25} />
        <p className="font-bold">212</p>
      </section>
    </div>
  );
}
