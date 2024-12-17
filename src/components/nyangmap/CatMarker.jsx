import { CustomOverlayMap } from "react-kakao-maps-sdk";

export default function CatMarker({ post, onClick }) {
  return (
    <CustomOverlayMap position={{ lat: post.latitude, lng: post.longitude }}>
      <div className="group cursor-pointer animate-bounce" onClick={onClick}>
        <div className="relative flex flex-col items-center">
          {/* 이미지 컨테이너 */}
          <div className="z-10 w-16 h-16 rounded-full border-4 border-orange  overflow-hidden transition-transform duration-300 group-hover:scale-110">
            <img
              src={post?.postPictureUrl}
              alt="Cat"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 핀 모양 */}
          <div className="w-8 h-8 bg-orange rotate-45 transform -translate-y-7 shadow-lg z-0"></div>

          {/* 그림자 효과 */}
          <div className="absolute -bottom-1 left-1/2 w-12 h-3 bg-black opacity-20 rounded-full blur-sm transform -translate-x-1/2"></div>
        </div>

        {/* 호버 시 나타나는 정보 */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white px-2 py-1 rounded shadow-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="text-xs font-semibold whitespace-nowrap">
            {post?.catName}
          </p>
        </div>
      </div>
    </CustomOverlayMap>
  );
}
