export default function DetailPostImage({ postData }) {
  console.log(postData);
  return (
    <div className="flex flex-col gap-4 p-6">
      {postData?.pictureUrl.map((url, idx) => (
        <div key={idx} className="w-full h-fit rounded-3xl bg-white">
          <img
            src={url}
            alt={`게시물 이미지-${idx}`}
            className="w-full h-fit p-6 rounded-2xl"
          />
        </div>
      ))}
    </div>
  );
}
