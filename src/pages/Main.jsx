import Button from "../components/common/Button";
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

  const loding = true;
  const error = newPostError || hotPostError;

  if (error) {
    <>
      <MdOutlineReportGmailerrorred size={100} color={"red"} className="m-auto" />
    </>;
  }
  return (
    <>
      <Header />
      {
        /* 로딩중이라면 */
        !loding ? (
          <>
            <div className="h-20" />
            <Title text={"NEW"} padding={28} />
            {/* <Button type={"submit"} text={"ID찾기"} isValid={true} /> */}
            <PostPreview />
            <hr className="bg-white h-1 w-[95%] mx-auto my-5" />
            <Title text={"HOT"} select="fire" />
            <PostPreview />
            <div className="h-20" />
          </>
        ) : (
          <Loading />
        )
      }
      <NavBar />
    </>
  );
}
