import Header from "../../components/common/Header.jsx";
import { Title } from "@mui/icons-material";
import useFetch from "../../hooks/useFetch.jsx";
import Error from "../../components/common/Error.jsx";
import Loading from "../../components/common/Loading.jsx";
import { IoIosCloseCircle } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
export default function EditPost({ postId }) {
  //해당 포스트 가져오기
  const {
    data: postData,
    error: postError,
    isLoading,
  } = useFetch("/api/post/" + postId);
  return (
    <div className="pb-24">
      <Header />
      <div className="h-20"></div>
      <Title text="EDIT" />
      {postError ? (
        <Error />
      ) : isLoading ? (
        <Loading />
      ) : (
        postData && (
          <div className="flex felx-col items-center w-11/12  bg-white h-auto m-auto rounded-3xl">
            {postData.pictureUrl?.length > 0 ? (
              <div>
                {postData.pictureUrl.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center p-10 relative"
                  >
                    <img
                      alt={`이미지 미리보기-${idx}`}
                      className="w-full h-auto object-cover rounded"
                      src={file}
                    />
                    <IoIosCloseCircle
                      size={25}
                      color="red"
                      //TODO onClick={} 삭제 구현
                      className="absolute top-12 right-12 cursor-pointer"
                    >
                      X
                    </IoIosCloseCircle>
                  </div>
                ))}
                <CiCirclePlus
                  className="my-auto mx-auto mb-4 cursor-pointer"
                  size={60}
                  type="button"
                  //TODO onClick={} 사진 추가 구현
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        )
      )}
      <section className="w-11/12 m-auto space-y-4 mt-4 mb-14">
      <div></div>
      </section>
    </div>
  );
}
