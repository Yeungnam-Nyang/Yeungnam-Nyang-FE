import { IoIosSend } from "react-icons/io";
export default function DetailPostCommentInput({ postId }) {
  return (
    <nav className="z-10 h-20 max-w-[768px] flex py-2 gap-3 fixed bottom-0 w-full justify-center align-middle  bg-orange">
      <input type="text" className="w-[96%] p-4  rounded-3xl" />
      <button
        type="button"
        className="my-auto flex-col rounded-full hover:bg-amber-500 bg-orange absolute w-14 h-14 shadow-lg top-1/2  right-6 transform -translate-y-1/2"
      >
        <IoIosSend color={"white"} size={30} className="m-auto " />
      </button>
    </nav>
  );
}
