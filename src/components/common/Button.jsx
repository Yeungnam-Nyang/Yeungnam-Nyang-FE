export default function Button({ text, type, isValid, onClick }) {
  // text : 버튼 이름
  //type : 버튼 제출 타입
  //isValid : 입력값 유효 할 시 버튼 색 변경 및 클릭 가능
  //onClick : 클릭 시 실행 함수

  return isValid ? (
    // 버튼 활성화
    <button
      type={type}
      onClick={onClick}
      className="font-['BagelFatOne'] text-white w-10/12 m-auto h-16 gap-4 flex bg-black text-2xl justify-center 
      items-center shadow-2xl hover:scale-110 duration-500 rounded-[40px]
      "
    >
      <img
        alt="img-button"
        src={`${
          import.meta.env.VITE_PUBLIC_URL
        }/assets/images/Icon_paw-white.png`}
        className="w-10"
      />
      {text}
    </button>
  ) : (
    // 버튼 비활성화
    <button
      type={type}
      disabled
      className="font-['BagelFatOne'] text-black w-10/12 m-auto h-16 gap-4 flex bg-white text-2xl justify-center 
      items-center shadow-2xl rounded-[40px]"
    >
      <img
        alt="img-button"
        src={`${
          import.meta.env.VITE_PUBLIC_URL
        }/assets/images/icon_pow.png`}
      />
      {text}
    </button>
  );
}
