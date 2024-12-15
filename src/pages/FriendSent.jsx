import Header from "../components/common/Header.jsx";
import Title from "../components/common/Title.jsx";
import {useEffect, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import api from "../api/api.jsx";
import Error from "../components/common/Error.jsx";
import Loading from "../components/common/Loading.jsx";
import { FaCircleXmark} from "react-icons/fa6";
import NavBar from "../components/common/NavBar.jsx";
import {useNavigate} from "react-router-dom";
import Wrapper from "../components/common/Wrapper.jsx";

export default function FriendSent(){
    const nav=useNavigate();

    //내가 보낸 친구목록
    const {data:requestList,isLoading:requestLoading,error:requestError}=useQuery(["friendRequest"],()=>
        api.get("/api/friend/sent-requests").then((res)=>res.data)
    );

    const [request, setRequest] = useState([]);

    const queryClient = useQueryClient();
    useEffect(() => {
        if (Array.isArray(requestList)) {
            setRequest(requestList);
        }

    }, [requestList]);



    //거절 버튼 클릭 -> 친구 신청에서 삭제
    const { mutate: refusal } = useMutation({
        mutationFn: (friendId) =>
            api.delete("/api/friend/cancel", {
                data: { friendId: friendId },
                headers: { "Content-Type": "application/json" },
            }),
        onMutate: async (friendId) => {
            //받은 친구요청
            await queryClient.cancelQueries(["friendRequest"]);

            const prevRequestList = queryClient.getQueryData(["friendRequest"]);

            setRequest(
                prevRequestList.filter((request) => request.friendId !== friendId)
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


    const handleRefusal = (friendId) => {
        refusal(friendId);
    };


    if(requestError)return <Error/>
    if(requestLoading)return <Loading/>

    return(
        <Wrapper>
            <Header/>
            <div className="h-20"></div>
            <Title text="FriendManager"/>
            <div className="flex items-center p-3 gap-3 ">
                <img
                    alt="foot"
                    src={`${import.meta.env.VITE_PUBLIC_URL}/assets/images/Icon_paw-white.png`}
                    className="w-10 h-auto"
                />
                <h1 className=" text-4xl text-black font-['BagelFatOne']">
                    보낸 친구요청
                </h1>
                <button className="text-lg text-black font-['BagelFatOne'] cursor-pointer"
                        onClick={() => nav("/friend/receive")}>&gt;받은 친구요청
                </button>
            </div>
            {/*  내가 보낸 친구목록  */}
            {request?.length !== 0 ? (request?.map((request, idx) => ((
                <section key={idx} className=" gap-5 justify-between py-4">
                    <div className="flex justify-between px-6">
                        <div className="flex gap-4">
                            <img
                                src={`${
                                    import.meta.env.VITE_PUBLIC_URL
                                }/assets/images/profile_default.png`}
                                alt="profile-img"
                                className="rounded-full w-20 bg-white"
                            />
                            <text className="font-[Bungee] font-bold text-3xl my-auto">
                                {request?.friendId}
                            </text>
                        </div>
                        <div className="my-auto gap-3 flex">
                            <FaCircleXmark
                                color="red"
                                size={40}
                                className="cursor-pointer hover:scale-110 duration-500 "
                                onClick={() => handleRefusal(request.friendId)}
                            />
                        </div>
                    </div>
                    <hr className="border-t-4 h-1  border-white w-[95%] mx-auto my-5"/>
                </section>
            )))) : <h1 className="px-6 text-3xl text-[orange] font-['BagelFatOne']">
                보낸 친구요청이 없습니다.
            </h1>}

            <NavBar/>
        </Wrapper>
    )
}