import Button from "../components/common/Button";
import Header from "../components/common/Header";
import NavBar from "../components/common/NavBar";
import Title from "../components/common/title";

export default function Main() {
  return (
    <>
      <Header />
      <Title text={"NEW"} />
      <Button type={"submit"} text={"ID찾기"} isValid={true} />
      <NavBar />
    </>
  );
}
