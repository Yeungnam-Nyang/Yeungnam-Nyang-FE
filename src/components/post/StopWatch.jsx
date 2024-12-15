import { useState, useEffect, memo, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faBowlFood } from "@fortawesome/free-solid-svg-icons";
import "./StopWatch.css";
import Button from "../common/Button";
import Loading from "../common/Loading";
import api from "../../api/api";
import useFetch from "../../hooks/useFetch";
import useSound from "use-sound";
import catSound from "../../../public/assets/sounds/cat.mp3";
import { useMutation, useQueryClient } from "react-query";

const Timer = memo(({ value, label }) => (
  <div className="timer w-16">
    <div className="relative flex items-center justify-center py-4 px-2">
      <h3 className="absolute text-2xl font-Cormorant font-semibold text-black">
        {String(value).padStart(2, "0")}
      </h3>
      <FontAwesomeIcon
        icon={faPaw}
        style={{ color: "white", fontSize: "3rem" }}
      />
    </div>
    <p className="font-['BagelFatOne'] text-lg font-Cormorant font-normal text-gray-900 mt-1 text-center w-full">
      {label}
    </p>
  </div>
));

const FoodBowl = memo(({ count, isFeeding }) => (
  <div className="mr-12 relative">
    <div className="relative inline-block">
      <FontAwesomeIcon
        icon={faBowlFood}
        className={`bowl-icon ${isFeeding ? "feeding" : ""}`}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-white bg-orange-500 rounded-full w-6 h-6 flex items-center justify-center">
          {count}
        </span>
      </div>
    </div>
  </div>
));

//현재 시간 밀리초까지
function getCurrentFormattedDate() {
  const now = new Date();
  // ISO 문자열 생성
  const isoString = now.toISOString(); // 예: "2024-12-08T11:54:54.500Z"

  // 밀리초 부분 길이 조정 (6자리로 만들기)
  const formattedMillis = isoString.split(".")[1]?.slice(0, 6); // 예: "500896"

  // 밀리초와 나머지 문자열 결합
  return `${isoString.split(".")[0]}.${formattedMillis}Z`;
}

export default function StopWatch({ postData }) {
  //TODO: 낙천적 업데이트 이용해서 밥준 횟수 업데이트
  const [post, setPost] = useState(postData);

  const queryClient = useQueryClient();
  const { mutate: feedingCount } = useMutation({
    //고양이 밥주기 요청
    mutationFn: ({ postId }) => api.put(`/api/post/catfood/${postId}`),

    //mutation 발생 시
    onMutate: async ({ postId }) => {
      await queryClient.cancelMutations(["post", postId]);
      const previousPost = queryClient.getQueryData(["post", postId]);

      setPost((prevPost) => ({
        ...prevPost,
        //고양이 밥주기 횟수 -> 4회 이상이면 값 유지
        catFoodCnt:
          prevPost?.catFoodCnt > 3
            ? prevPost?.catFoodCnt
            : prevPost?.catFoodCnt + 1,

        //마지막 밥준 시간 - 날짜 형식(2024-12-08T11:54:54.500896)
        //3회 이상 밥 줬으면 이전 날짜값 유지
        catStopWatch:
          prevPost?.catFoodCnt > 3
            ? prevPost?.catStopWatch
            : String(getCurrentFormattedDate()),
      }));

      return { previousPost };
    },

    onError: (error, newPost, context) => {
      setPost(context.previousPost);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["post", post?.postId]);
    },
  });

  //고양이 소리 효과음
  const [play] = useSound(catSound);
  const [isFeeding, setIsFeeding] = useState(false);
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [intervalId, setIntervalId] = useState(null);
  const [lastFeedingTime, setLastFeedingTime] = useState(null);
  //버튼 클릭 활성
  const [isButtonActive, setIsButtonActive] = useState(true);

  // 버튼 활성화 상태를 useEffect로 관리
  useEffect(() => {
    setIsButtonActive(!(postData?.catFoodCnt >= 3));
  }, [postData?.catFoodCnt]);

  const calculateTimeDiff = (lastFeedingTime) => {
    const now = new Date();
    const diff = now - new Date(lastFeedingTime);

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
  };

  useEffect(() => {
    if (!postData?.catStopWatch) return;
    setLastFeedingTime(postData.catStopWatch);
  }, [postData]);

  useEffect(() => {
    if (!lastFeedingTime) return;

    const updateTimer = () => {
      setTime(calculateTimeDiff(lastFeedingTime));
    };
    const interval = setInterval(updateTimer, 1000);
    updateTimer(); // 초기 실행

    return () => {
      clearInterval(interval); // 컴포넌트 언마운트 시 정리
    };
  }, [lastFeedingTime]);

  const handleFeedClick = async () => {
    try {
      setIsFeeding(true);
      if (postData?.catFoodCnt > 2) {
        alert("밥은 하루에 4회 이상 줄 수 없어요!");
        return;
      }
      feedingCount({ postId: post?.postId });

      // 타이머 초기화
      if (intervalId) {
        clearInterval(intervalId);
      }
      setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      play();
    } catch (error) {
      console.error("급식 업데이트 실패:", error);
      setIsFeeding(false);
    }
  };

  //TODO 에러 및 로딩 컨트롤
  return (
    <div className="py-10 w-auto">
      <div className="flex items-center justify-center w-auto gap-4 count-down-main">
        <FoodBowl count={post?.catFoodCnt} isFeeding={isFeeding} />
        <Timer value={time.days} label="일" />
        <h3 className="font-manrope font-semibold text-2xl text-gray-900">:</h3>
        <Timer value={time.hours} label="시간" />
        <h3 className="font-manrope font-semibold text-2xl text-gray-900">:</h3>
        <Timer value={time.minutes} label="분" />
        <h3 className="font-manrope font-semibold text-2xl text-gray-900">:</h3>
        <Timer value={time.seconds} label="초" />
      </div>
      <div className="h-5" />
      {!isButtonActive && (
        <p className="text-center text-red-500">밥준 횟수가 초과되었습니다.</p>
      )}
      <div className="h-5" />
      <Button
        text="밥 주기"
        isValid={isButtonActive}
        onClick={handleFeedClick}
      />
    </div>
  );
}

Timer.displayName = "Timer";
FoodBowl.displayName = "FoodBowl";
