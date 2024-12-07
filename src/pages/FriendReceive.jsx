import Header from "../components/common/Header.jsx";
import Title from "../components/common/Title.jsx";
import NavBar from "../components/common/NavBar.jsx";
import {useMutation, useQuery, useQueryClient} from "react-query";
import api from "../api/api.jsx";
import {useEffect, useState} from "react";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6"
import Loading from "../components/common/Loading.jsx";
import Error from "../components/common/Error.jsx";
import {useNavigate} from "react-router-dom";
export default function FriendReceive(){
    const nav=useNavigate();
    //내가 받은 친구목록
    const {data:receiveList,isLoading:receiveLoading,error:receiveError}=useQuery(["friendReceive"],()=>
        api.get("/api/friend/received-requests").then((res)=>res.data)
    );


    const [receive,setReceive]=useState([]);
    const queryClient = useQueryClient();

    useEffect(() => {
        if(Array.isArray(receiveList)){
            setReceive(receiveList);
        }
    }, [receiveList]);

    //수락 버튼 클릭 -> 친구목록으로
    const { mutate: agree } = useMutation({
        mutationFn: (friendId) =>
            api.put(`/api/friend/respond?friendId=${friendId}&status=REQUESTED`),

        onMutate: async (friendId) => {
            //친구요청목록 업뎃
            await queryClient.cancelQueries(["friendReceive"]);
            const prevReceiveList = queryClient.getQueryData(["friends"]);

            setReceive(
                prevReceiveList.filter((receive) => receive.friendId !== friendId)
            );
            //친구 목록 업뎃
            await queryClient.cancelQueries(["friends"]);
            const prevFriendsList = queryClient.getQueryData(["friends"]);
            queryClient.setQueryData(["friends"], (old) => [
                ...old,
                { userId: Math.random(), friendId: friendId, message: "" },
            ]);

            return { prevReceiveList, prevFriendsList };
        },
    });


    //거절 버튼 클릭 -> 친구 신청에서 삭제
    const { mutate: refusal } = useMutation({
        mutationFn: (friendId) =>
            api.delete("/api/friend/cancel", {
                data: { friendId: friendId },
                headers: { "Content-Type": "application/json" },
            }),
        onMutate: async (friendId) => {
            //보낸 친구요청
            await queryClient.cancelQueries(["friendReceive"]);

            const prevReceiveList=queryClient.getQueryData(["friendReceive"]);
            setReceive(
                prevReceiveList.filter((receive)=>receive.friendId!==friendId)
            );
            return { prevReceiveList };
        },
        onError: (error, _, context) => {
            setReceive(context.prevReceiveList);
        },
        onSettled: () => {
            queryClient.invalidateQueries(["friendReceive"]);
        },
    });

    const handleRefusal = (friendId) => {
        refusal(friendId);
    };
    const handleAgree = (friendId) => {
        agree(friendId);
    };

    if(receiveLoading)return <Loading/>
    if(receiveError)return <Error/>
    return(
        <>
            <Header/>
            <div className="h-20"></div>
            <Title text="FriendManager"/>
            <div className="flex items-center p-3 gap-3">
                <img
                    alt="foot"
                    src={`${import.meta.env.VITE_PUBLIC_URL}/assets/images/Icon_paw-white.png`}
                    className="w-10 h-auto"
                />
                <h1 className=" text-4xl text-black font-['BagelFatOne']">
                    받은 친구요청
                </h1>
                <button className="text-lg text-black font-['BagelFatOne'] cursor-pointer"
                        onClick={() => nav("/friend/send")}>&lt;보낸 친구요청
                </button>
            </div>
            {/* 내가 받은 친구 요청 */}
            {receive?.length !== 0 ? (receive?.map((friend, idx) => (
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
                    <hr className="border-t-4 h-1  border-white w-[95%] mx-auto my-5"/>
                </section>
            ))) : <h1 className="px-6 text-3xl text-[orange] font-['BagelFatOne']">
                받은 친구요청이 없습니다.
            </h1>}

            <NavBar/>
        </>
    )
}