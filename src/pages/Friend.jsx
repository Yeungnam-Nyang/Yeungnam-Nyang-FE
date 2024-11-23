import { useState } from "react";
import Header from "../components/common/Header";
import NavBar from "../components/common/NavBar";
import Title from "../components/common/Title";
import FriendList from "../components/friend/FriendList";
import useFetch from "../hooks/useFetch";
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
    isError,
  } = useQuery(["friends"], () =>
    api.get("/api/friend/list").then((res) => res.data)
  );

  const {
    data: requestList,
    isLoading: requestLoading,
    isError: requestError,
  } = useQuery(["friendRequest"], () =>
    api.get("/api/friend/sent-requests").then((res) => res.data)
  );
  console.log("re" + requestList);
  return (
    <>
      <Header />
      <div className="h-20"></div>
      <Title text="FRIEND" />
      {isError ? (
        <Error />
      ) : isLoading ? (
        <Loading />
      ) : (
        <>
          <h1 className="font-[BagelFatOne] px-6 font-bold text-3xl py-6">
            친구목록 {friendList.length}명
          </h1>
          {requestList && <FriendRequest requestList={requestList} />}
          <FriendList friendList={friendList} />
        </>
      )}
      <NavBar />
    </>
  );
}
