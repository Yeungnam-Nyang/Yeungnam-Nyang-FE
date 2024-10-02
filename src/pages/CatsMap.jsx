import Header from "../components/common/Header";
import NavBar from "../components/common/NavBar";
import Title from "../components/common/title";
import KakoMap from "../components/nyangmap/KakaoMap";
import NyangBox from "../components/nyangmap/NyangBox";

export default function CatsMap() {
  return (
    <div>
      <Header />
      <Title text={"NYANG MAP"} />
      <main className="px-6 gap-4 pb-32">
        <KakoMap />
        <NyangBox catNumber="10" />
      </main>
      <NavBar />
    </div>
  );
}
