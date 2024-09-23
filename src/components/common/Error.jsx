import error from "../../assets/images/error.png";
export default function Error() {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center mb-20">
      <img src={error} alt="로딩중" width="30%"></img>
      <div className="text-center">죄송합니다.오류가 발생했습니다.</div>
      <div className="text-center">새로고침을 해주세요.</div>
    </div>
  );
}
