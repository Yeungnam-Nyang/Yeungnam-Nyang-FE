import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import { useMutation, useQueryClient } from "react-query";
import api from "../../api/api";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Error from "../common/Error";
import Loading from "../common/Loading";
import axios from "axios";

export default function FriendRequest({ requestList }) {
  const [request, setRequest] = useState([]);
  const queryClient = useQueryClient();
  useEffect(() => {
    if (Array.isArray(requestList)) {
      setRequest(requestList);
    }
  }, [requestList]);
  //수락 버튼 클릭 -> 친구목록으로
  const { mutate: agree } = useMutation({
    mutationFn: (friendId) =>
      api.put(`/api/friend/respond?friendId=${friendId}&status=REQUESTED`),

    onMutate: async (friendId) => {
      //친구요청목록 업뎃
      await queryClient.cancelQueries(["friendRequest"]);
      const prevRequestList = queryClient.getQueryData(["friends"]);

      setRequest(
        prevRequestList.filter((request) => request.friendId !== friendId)
      );
      //친구 목록 업뎃
      await queryClient.cancelQueries(["friends"]);
      const prevFriendsList = queryClient.getQueryData(["friends"]);
      queryClient.setQueryData(["friends"], (old) => [
        ...old,
        { userId: Math.random(), friendId: friendId, message: "" },
      ]);

      return { prevRequestList, prevFriendsList };
    },
  });
  //거절 버튼 클릭 -> 친구 신청에서 삭제
  const { mutate: refusal } = useMutation({
    mutationFn: async (friendId) =>
     await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/friend/cancel`,
         {
           headers:{
             Authorization:`Bearer `+localStorage.getItem("token"),
           },
           data:{friendId:friendId}
         }

      ),
    onMutate: async (friendId) => {
      await queryClient.cancelQueries(["friendRequest"]);
      const prevRequestList = queryClient.getQueryData(["friendRequest"]);
      setRequest(
        prevRequestList.filter((request) => request.friendId === friendId)
      );
      return { prevRequestList };
    },
    onError: (error, _, context) => {
      setRequest(context.prevRequestList);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["friendRequest"]);
    },
  });

  //내가 보낸 친구요청
  const { arrData, error, isLoading } = useFetch("/api/friend/sent-requests");
  const handleRefusal = (friendId) => {
    refusal(friendId);
  };
  const handleAgree = (friendId) => {
    agree(friendId);
  };
  console.log(arrData);
  if (error) return <Error />;
  if (isLoading) return <Loading />;
  return (
    <>
      <h1 className="font-[BagelFatOne] px-6 font-bold text-3xl py-6">
        친구 신청
      </h1>
      {/* 내가 보낸 친구요청 */}
      {arrData &&
        arrData.map((friend, idx) => (
          <section key={idx} className=" gap-5 justify-between py-4">
            <div className="flex justify-between px-6">
              <div className="flex gap-4">
                <img
                  // TODO : 나중에 실제 프로필 사진으로
                  src={`${
                    import.meta.env.VITE_PUBLIC_URL
                  }/assets/images/profile_default.png`}
                  alt="profile-img"
                  className="rounded-full w-20 bg-white"
                />
                <text className="font-[Bungee] font-bold text-3xl my-auto">
                  {friend?.friendId}
                </text>
              </div>
              <div className="my-auto gap-3 flex">
                <FaCircleXmark
                  color="red"
                  size={40}
                  className="cursor-pointer hover:scale-110 duration-500 "
                  onClick={() => handleRefusal(friend.friendId)}
                />
              </div>
            </div>
            <hr className="bg-white h-1 w-[95%] mx-auto my-5" />
          </section>
        ))}
      {/* 내가 받은 친구 요청 */}
      {request &&
        request.map((friend, idx) => (
          <section key={idx} className=" gap-5 justify-between py-4">
            <div className="flex justify-between px-6">
              <div className="flex gap-4">
                <img
                  // TODO : 나중에 실제 프로필 사진으로
                  src={`${
                    import.meta.env.VITE_PUBLIC_URL
                  }/assets/images/profile_default.png`}
                  alt="profile-img"
                  className="rounded-full w-20 bg-white"
                />
                <text className="font-[Bungee] font-bold text-3xl my-auto">
                  {friend?.friendId}
                </text>
              </div>
              <div className="my-auto gap-3 flex">
                <FaCircleCheck
                  size={40}
                  color="green"
                  className="cursor-pointer hover:scale-110 duration-500 "
                  onClick={() => handleAgree(friend.friendId)}
                />
                <FaCircleXmark
                  color="red"
                  size={40}
                  className="cursor-pointer hover:scale-110 duration-500 "
                  onClick={() => handleRefusal(friend.friendId)}
                />
              </div>
            </div>
            <hr className="bg-white h-1 w-[95%] mx-auto my-5" />
          </section>
        ))}
    </>
  );
}
