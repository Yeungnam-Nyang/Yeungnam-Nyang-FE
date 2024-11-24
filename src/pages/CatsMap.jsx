import Header from "../components/common/Header";
import NavBar from "../components/common/NavBar";
import Title from "../components/common/Title";
import KakoMap from "../components/nyangmap/KakaoMap";
import NyangBox from "../components/nyangmap/NyangBox";
import { useCatMapPosts } from "../store/useCatMapPosts";

export default function CatsMap() {
  const { postsCount } = useCatMapPosts();
  return (
    <div>
      <Header />
      <div className="h-20"></div>
      <Title text={"NYANG MAP"} />
      <main className="px-6 gap-4 pb-32">
        <KakoMap />
        <NyangBox catNumber={postsCount} />
      </main>
      <NavBar />
    </div>
  );
}
