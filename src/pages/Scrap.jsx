import { useNavigate } from "react-router-dom";
import Error from "../components/common/Error";
import Header from "../components/common/Header";
import Loading from "../components/common/Loading";
import NavBar from "../components/common/NavBar";
import Title from "../components/common/Title";
import useFetch from "../hooks/useFetch";

export default function Scrap() {
  //스크랩 게시글 가져오기
  const { arrData:data, isLoading, error } = useFetch("/api/post/myscrap");
  const nav = useNavigate();
  return (
    <>
      <Header />
      <div className="h-20"></div>
      <Title text={"SCRAP"} padding={28} />
      {error ? (
        <Error />
      ) : isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 gap-4 p-4">
          {data.length === 0 ? (
            <div className="p-3 text-3xl text-[orange] font-['BagelFatOne']">
              스크랩한 게시물이 없습니다.
            </div>
          ) : (
            data &&
            data.map((post) => (
              <div
                key={post?.postId}
                onClick={() => nav(`/post/${post?.postId}`)}
                className="flex shadow-2xl  flex-col rounded-xl bg-white align-middle justify-center items-center"
              >
                <img
                  src={post?.pictureUrl[0]}
                  className="rounded-xl mt-4 w-60 h-60 object-cover cursor-pointer hover:scale-110 duration-500"
                />
                <h1 className="font-['BagelFatOne'] text-3xl p-4">
                  {post?.catName}
                </h1>
              </div>
            ))
          )}
        </div>
      )}
      <NavBar />
    </>
  );
}
