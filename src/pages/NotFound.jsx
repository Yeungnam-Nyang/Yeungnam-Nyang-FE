import Header from "../components/common/Header";
import NavBar from "../components/common/NavBar";
import Wrapper from "../components/common/Wrapper";

export default function NotFound() {
  return (
    <Wrapper>
      <Header />
      <section className="flex flex-col items-center  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img
          alt="404error"
          src={`${import.meta.env.VITE_PUBLIC_URL}/assets/images/404.png`}
          className="w-2/4 h-auto"
        />
        <h1 className="font-['BagelFatOne'] text-black text-5xl">404</h1>
        <h1 className="font-['BagelFatOne'] text-black text-5xl">
          페이지를 찾을 수 없습니다.
        </h1>
        <text className="font-['BagelFatOne'] text-black">
          죄송합니다. 요청하신 페이지를 찾을 수 없습니다. 홈으로 돌아가세요.
        </text>
      </section>
      <NavBar />
    </Wrapper>
  );
}
