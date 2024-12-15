import Header from "../components/common/Header";
import NavBar from "../components/common/NavBar";
import Title from "../components/common/Title";
import KakoMap from "../components/nyangmap/KakaoMap";
import NyangBox from "../components/nyangmap/NyangBox";
import useLocationPermission from "../hooks/useLocationPermission";
import { useCatMapPosts } from "../store/useCatMapPosts";

export default function CatsMap() {
  const { postsCount } = useCatMapPosts();
  //위치 정보 허용여부
  const { isLocationAllowed } = useLocationPermission();
  return (
    <div>
      <Header />
      <div className="h-20"></div>
      <Title text={"NYANG MAP"} />
      <main className="px-6 gap-4 pb-32">
        {isLocationAllowed === null && <div>위치 허용여부 확인중...</div>}
        {/* 위치 허용이 수락되었을 때 */}
        {isLocationAllowed === true && (
          <>
            <KakoMap />
            <div className="text-slate-400 py-3">
              현재 위치 기준 200미터 내의 고양이들이 등장해요!
            </div>
            <NyangBox catNumber={postsCount} />
          </>
        )}
        {/* 위치 허용이 거부되었을 때 */}
        {isLocationAllowed === false && (
          <div className="flex flex-col text-left gap-5">
            <a className="font-['Bungee'] text-lg pr-6 text-red-500">
              위치 권한이 거부되었습니다. 설정에서 위치 권한을 허용해주세요.
            </a>
            <a className="font-['Bungee'] text-2xl pr-6">ios</a>
            <a className="font-['Bungee'] text-sm">
              설정-&gt;위치 서비스-&gt;접속한 브라우저 선택-&gt;위치
              접근허용-[&quot;앱을 사용하는 동안&quot;]선택
            </a>
            <a className="font-['Bungee'] text-2xl pr-6 pt-5">안드로이드</a>
            <a className="font-['Bungee'] text-sm">
              설정-&gt;위치-&gt;위치사용-[&quot;사용&quot;]선택
            </a>
          </div>
        )}
      </main>
      <NavBar />
    </div>
  );
}
