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

  const loding = newPostLoading || hotPostLoading;
  const error = newPostError || hotPostError;

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
            <div className="p-3 text-3xl text-[orange] font-['BagelFatOne']">게시물이 없습니다.</div>
          ) : (
            <PostPreview postData={newPostData} />
          )}

          <hr className="bg-white h-1 w-[95%] mx-auto my-5" />
          <Title text={"HOT"} select="fire" />
          {/* 포스트가 없을 때 */}
          {hotPostData?.message === "NULL" ? (
            <div className="p-3 text-3xl text-[orange] font-['BagelFatOne']">게시물이 없습니다.</div>
          ) : (
            <PostPreview postData={hotPostData} />
          )}
          <div className="h-20" />
        </>
      )}
      <NavBar />
    </>
  );
}
