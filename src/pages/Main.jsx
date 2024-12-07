import Button from "../components/common/Button";
import Error from "../components/common/Error";
import Header from "../components/common/Header";
import Loading from "../components/common/Loading";
import NavBar from "../components/common/NavBar";
import Title from "../components/common/Title";
import PostPreview from "../components/main/PostPreview";
import useFetch from "../hooks/useFetch";
import { MdOutlineReportGmailerrorred } from "react-icons/md";

export default function Main() {
  //게시물 정보 가져오기
  const {
    data: newPostData,
    isLoading: newPostLoading,
    error: newPostError,
  } = useFetch("/api/post/new");
  const {
    data: hotPostData,
    isLoading: hotPostLoading,
    error: hotPostError,
  } = useFetch("/api/post/popular");

  //프로필 가져오기
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useFetch("/api/user/profile");
  const loding = newPostLoading || hotPostLoading || userLoading;
  const error = newPostError || hotPostError || userError;

  return (
    <>
      <Header />
      {error ? (
        <Error />
      ) : loding ? (
        <Loading />
      ) : (
        <>
          <div className="h-20" />
          <Title text={"NEW"} padding={28} />
          {/* 포스트가 없을 떄 */}
          {newPostData?.message === "NULL" ? (
            <div className="p-3 text-3xl text-[orange] font-['BagelFatOne']">
              게시물이 없습니다.
            </div>
          ) : (
            <PostPreview postData={newPostData} userData={userData}/>
          )}

          <hr className="border-t-4 h-1  border-white w-[95%] mx-auto my-5" />
          <Title text={"HOT"} select="fire" />
          {/* 포스트가 없을 때 */}
          {hotPostData?.message === "NULL" ? (
            <div className="p-3 text-3xl text-[orange] font-['BagelFatOne']">
              게시물이 없습니다.
            </div>
          ) : (
            <PostPreview postData={hotPostData}  userData={userData}/>
          )}
          <div className="h-20" />
        </>
      )}
      <NavBar />
    </>
  );
}
