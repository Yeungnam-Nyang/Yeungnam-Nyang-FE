import Header from "../components/common/Header";
import NavBar from "../components/common/NavBar";
import Title from "../components/common/Title";
import FriendList from "../components/friend/FriendList";
import Error from "../components/common/Error";
import Loading from "../components/common/Loading";
import { useQuery } from "react-query";
import api from "../api/api";
import FriendRequest from "../components/friend/FriendRequest";

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

  const {
    data: requestList,
    isLoading: requestLoading,
    error: requestError,
  } = useQuery(["friendRequest"], () =>
    api.get("/api/friend/received-requests").then((res) => res.data)
  );
  const totalError = error || requestError;
  const totalLoading = isLoading || requestLoading;
  return (
    <>
      <Header />
      <div className="h-20"></div>
      <Title text="FRIEND" />
      {totalError ? (
        <Error />
      ) : totalLoading ? (
        <Loading />
      ) : (
        <>
          <h1 className="font-[BagelFatOne] px-6 font-bold text-3xl py-6">
            친구목록 {friendList.length}명
          </h1>
          {friendList.length === 0 ? (
            <h1 className="px-6 text-3xl text-[orange] font-['BagelFatOne']">
              친구가 없습니다.
            </h1>
          ) : (
            friendList && <FriendList friendList={friendList} />
          )}
          {requestList && <FriendRequest requestList={requestList} />}
        </>
      )}
      <NavBar />
    </>
  );
}
