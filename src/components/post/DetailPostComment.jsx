import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import api from "../../api/api";
import DropMenu from "../common/DropMenu";
import dateCalculator from "../../utils/dateCalculator";
import { MdDelete } from "react-icons/md";
export default function DetailPostComment({ commentData, postId }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [userId, setUserId] = useState(null);
  const [comments, setComments] = useState(commentData);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const LAST_PAGE = Math.ceil(commentData?.length / 5) || 1;

  const safeCommentData = Array.isArray(comments) ? comments : [];

  const myComment = async () => {
    try {
      const response = await api.get("/api/me");
      setUserId(response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    myComment();
  }, [safeCommentData, postId]);

  useEffect(() => {
    if (comments) {
      setComments(commentData);
    }
  }, [commentData]);

  const handleCommentList = () => {
    if (safeCommentData.length === 0) {
      return <div className="text-center font-bold">댓글이 없습니다.</div>;
    }
    return safeCommentData
      .slice(5 * (currentPage - 1), 5 * currentPage)
      .map((item) => (
        <div key={item.commentId} className="mb-4">
          <div className="flex justify-between items-start">
            <div className="flex items-start">
              <img
                src={
                  item.userProfilUrl ||
                  `${
                    import.meta.env.VITE_PUBLIC_URL
                  }/assets/images/profile_default.png`
                }
                alt={`${item.userId} 프로필`}
                className="w-10 h-10 rounded-full mr-3 bg-white"
              />
              <div>
                <div className="flex items-center gap-2 m-auto ">
                  <p className="font-bold text-xl">{item.userId}</p>
                  <p className="text-sm text-gray">
                    {dateCalculator(item.commentDate)}
                  </p>
                </div>
                <p className="mt-2">{item.content}</p>
              </div>
            </div>
            {userId === item.userId && (
              <MdDelete
                className="cursor-pointer my-auto"
                size={20}
                onClick={() => handleDelete(item.commentId)}
              />
            )}
          </div>
          <hr className="bg-slate-400 h-[1px] w-full mx-auto mt-4" />
        </div>
      ));
  };

  const handleDelete = (commentId) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        api.delete(`/api/comment/delete/${commentId}`);

        alert("삭제되었습니다.");
      } catch (error) {
        alert("오류가 발생했습니다.");
        console.error("Failed to delete comment:", error);
      }
    }
  };

  return (
    <div className="px-6 py-2">
      {handleCommentList()}
      <Stack spacing={2}>
        <Pagination
          page={currentPage}
          count={LAST_PAGE}
          onChange={handlePageChange}
          className="flex flex-auto m-auto justify-center"
        />
      </Stack>
    </div>
  );
}
