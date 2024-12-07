import { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import DropMenu from "../common/DropMenu";

export default function DetailPostHeader({ postData }) {
  //자기 게시물 -> 삭제하기 , 수정하기
  //자기 게시물이 아니면 -> 저장하기
  const myOptions = ["삭제하기", "수정하기"];
  const otherOptions = ["저장하기"];
  const [options, setOptions] = useState(otherOptions);
  const [anchorEl, setAnchorEl] = useState(null);

  const nav = useNavigate();
  //게시물 판단 불리언 값
  const myPost = async () => {
    const response = await api.get(`/api/post/my/${postData?.postId}`);

    //내 게시물인 경우
    if (response.data.message === "TRUE") {
      setOptions(myOptions);
    }
  };

  //삭제하기
  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await api.delete(`/api/post/${postData?.postId}`);
        alert("삭제되었습니다.");
        nav(-1);
      } catch (error) {
        alert("오류가 발생했습니다.");
      }
    }
  };

  //저장하기
  const handleScrap = async () => {
    if (window.confirm("게시물을 저장하시겠습니까?")) {
      try {
        const response = await api.post(`/api/post/${postData?.postId}/scrap`);
        //이미 저장된 게시물
        if (response.data.code === "FAIL") {
          alert("이미 저장된 게시물입니다.");
        } else if (response.data.code === "SUCCESS") {
          alert("게시물이 저장되었습니다.");
        }
      } catch (e) {
        alert("오류가 발생했습니다.");
      }
    }
  };

  //수정하기
  const handleUpdate = (postId) => {
    nav(`/post/edit/${postId}`);
  };
  useEffect(() => {
    // //내 게시물이라면
    myPost();
  }, []);

  const handleClose = (option, postId) => {
    setAnchorEl(null);
    switch (option) {
      case "삭제하기":
        handleDelete();
        break;
      case "수정하기":
        handleUpdate(postId);
        break;
      case "저장하기":
        handleScrap();
        break;
      default:
        break;
    }
  };

  return (
    <section className="flex p-4 gap-4  items-center py-4 justify-between">
      <div className="cursor-pointer flex flex-row items-center gap-4">
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
        <p className="flex text-2xl font-bold">
          {postData?.userId ? postData?.userId : "아이디"}
        </p>
      </div>
      <DropMenu
        options={options}
        setAnchorEl={setAnchorEl}
        anchorEl={anchorEl}
        handleClose={(options) => handleClose(options, postData?.postId)}
      />
    </section>
  );
}
