import { useNavigate } from "react-router-dom";

export default function FriendList({ friendList }) {
  console.log(friendList);
  const nav = useNavigate();
  const handleClick = (friendId) => {
    nav(`/friend/profile?friendId=${encodeURIComponent(friendId)}`);
  };
  return (
    <>
      {friendList.length === 0 ? (
        <h1 className="text-black font-bold text-3xl flex align-middle justify-center">
          친구가 없습니다.
        </h1>
      ) : (
        friendList.map((friend, idx) => (
          <section
            key={idx}
            className="flex px-6 gap-5 justify-between py-4"
            onClick={() => handleClick(friend?.friendId)}
          >
            <div className="flex gap-4">
              <img
                src={`${
                  import.meta.env.VITE_PUBLIC_URL
                }/assets/images/profile_default.png`}
                alt="profile-img"
                className="rounded-full w-20 bg-white"
              />
              <text className="font-[Bungee] font-bold text-3xl my-auto">
                TKV00
              </text>
            </div>
            <div className="my-auto">
              <button
                type="button"
                className="font-['BagelFatOne'] text-white w-56 m-auto h-16 gap-4 flex bg-orange text-2xl justify-center 
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
                상세보기
              </button>
            </div>
          </section>
        ))
      )}
    </>
  );
}
