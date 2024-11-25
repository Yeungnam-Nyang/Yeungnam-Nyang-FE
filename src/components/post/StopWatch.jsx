import { useState, useEffect, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faBowlFood } from "@fortawesome/free-solid-svg-icons";
import "./StopWatch.css";
import Button from "../common/Button";
import Loading from "../common/Loading";
import api from "../../api/api";
import useFetch from "../../hooks/useFetch";
import useSound from "use-sound";
import catSound from "../../../public/assets/sounds/cat.mp3";

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

export default function StopWatch({ postId }) {
  //TODO: 낙천적 업데이트 이용해서 밥준 횟수 업데이트
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

  const { data: post, loading } = useFetch(`/api/post/${postId}`);

  // 버튼 활성화 상태를 useEffect로 관리
  useEffect(() => {
    if (post && post.catFoodCnt >= 3) {
      setIsButtonActive(false);
    } else {
      setIsButtonActive(true);
    }
  }, [post?.catFoodCnt]);

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
    if (!post?.catStopWatch) return;
    setLastFeedingTime(post.catStopWatch);
  }, [post]);

  useEffect(() => {
    if (!lastFeedingTime) return;

    const updateTimer = () => {
      setTime(calculateTimeDiff(lastFeedingTime));
    };

    if (intervalId) {
      clearInterval(intervalId);
    }

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    setIntervalId(interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [lastFeedingTime]);

  const handleFeedClick = async () => {
    try {
      setIsFeeding(true);
      await api.put(`/api/post/catfood/${postId}`);

      // 타이머 초기화
      if (intervalId) {
        clearInterval(intervalId);
      }
      setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      play();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("급식 업데이트 실패:", error);
      setIsFeeding(false);
    }
  };

  if (!post || loading) return <Loading />;

  return (
    <div className="py-10">
      <div className="flex items-center justify-center w-full gap-4 count-down-main">
        <FoodBowl count={post.catFoodCnt} isFeeding={isFeeding} />
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
