
import Header from "../components/common/Header";
import NavBar from "../components/common/NavBar";
import Title from "../components/common/Title";
import FriendList from "../components/friend/FriendList";
import Error from "../components/common/Error";
import Loading from "../components/common/Loading";
import { useQuery } from "react-query";
import api from "../api/api";
import {useNavigate} from "react-router-dom";
import Wrapper from "../components/common/Wrapper";

export default function Friend() {
  //친구목록 가져오기
  //쿼리로 가져오기
  const {
    data: friendList,
    isLoading,
    error,
  } = useQuery(["friends"], () =>
    api.get("/api/friend/list").then((res) => res.data)
  );

  const nav=useNavigate();
  return (
    <Wrapper>
      <Header />
      <div className="h-20"></div>
      <Title text="FRIEND" />
      {error ? (
        <Error />
      ) : isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex">
              <div className="flex items-center p-3 gap-3">
                  <img
                      alt="foot"
                      src={`${import.meta.env.VITE_PUBLIC_URL}/assets/images/Icon_paw-white.png`}
                      className="w-10 h-auto"
                  />
                  <h1 className=" text-4xl text-black font-['BagelFatOne']">
                      친구목록
                  </h1>
              </div>
              <button className="text-lg text-black font-['BagelFatOne'] cursor-pointer"
                      onClick={() => nav("/friend/send")}>&gt;보낸/받은 친구요청 보기
              </button>
          </div>
            {friendList.length === 0 ? (
                <h1 className="px-6 text-3xl text-[orange] font-['BagelFatOne']">
                    친구가 없습니다.
                </h1>
            ) : (
                friendList && <FriendList friendList={friendList} />
          )}

        </>
      )}
      <NavBar />
    </Wrapper>
  );
}
