import default_img from "../../assets/images/profile_default.png";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useReducer, useState } from "react";
import api from "../../api/api";

const initialState = {};

function reducer(state, action) {
  switch (action.type) {
    case "DELETE":
      return api.delete(`/api/post/${action.id}-delete`).then(() => ({
        ...state,
        status: "Deleted",
      }));
    case "UPDATE":
      return api.put(`/api/post/${action.id}-delete`).then(() => ({
        ...state,
        status: "Updated",
      }));
    case "SCRAP":
      return api.post(`/api/post/${action.id}-scrap`).then(() => ({
        ...state,
        status: "Scrapped",
      }));
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
export default function DetailPostHeader({ postData }) {
  //자기 게시물 -> 삭제하기 , 수정하기
  //자기 게시물이 아니면 -> 저장하기
  const myOptions = ["삭제하기", "수정하기"];
  const otherOptions = ["저장하기"];
  const ITEM_HEIGHT = 48;

  //게시물 판단 불리언 값
  const userId = localStorage.getItem("userId");
  const [options, setOptions] = useState(null);
  useEffect(() => {
    // //내 게시물이라면
    // if (postData?.userId === userId) {
    //   setOptions(myOptions);
    // }
    // //내 게시물이 아닌 경우
    // else {
    //   setOptions(otherOptions);
    // }
    //일단은 옵션값 임의 지정
    setOptions(myOptions);
  }, [postData, userId]);

  //useReducer
  const [state, dispatch] = useReducer(reducer, initialState);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (option) => {
    setAnchorEl(null);

    if (option === "삭제하기") {
      dispatch({ type: "DELETE", id: postData?.postId });
    } else if (option === "수정하기") {
      dispatch({ type: "UPDATE", id: postData?.postId });
    } else if (option === "저장하기") {
      dispatch({ type: "SCRAP", id: postData?.postId });
    }
  };

  return (
    <section className="flex p-4 gap-4  items-center py-4 justify-between">
      <div className="cursor-pointer flex flex-row items-center gap-4">
        <img
          alt="profile_img"
          src={postData?.profileUrl ? postData.profileUrl : default_img}
          className="rounded-full w-10 h-auto bg-white"
        />
        <p className="flex text-2xl font-bold">
          {postData?.userId ? postData?.userId : "아이디"}
        </p>
      </div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          },
        }}
      >
        {options?.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={() => handleClose(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </section>
  );
}
