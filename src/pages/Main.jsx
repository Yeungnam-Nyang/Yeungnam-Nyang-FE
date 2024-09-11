import Button from "../components/common/Button";
import Header from "../components/common/Header";
import NavBar from "../components/common/NavBar";
import Title from "../components/common/Title";
import PostPreview from "../components/main/PostPreview";

export default function Main() {
  return (
    <>
      <Header />
      <div className="h-20" />
      <Title text={"NEW"} padding={28} />
      {/* <Button type={"submit"} text={"ID찾기"} isValid={true} /> */}
      <PostPreview />
      <hr className="bg-white h-1 w-[95%] mx-auto my-5" />
      <Title text={"HOT"} select="fire" />
      <PostPreview />
      <div className="h-20" />
      <NavBar />
    </>
  );
}
