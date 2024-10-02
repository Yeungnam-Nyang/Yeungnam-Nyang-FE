import spinner from "../../assets/images/spinner.gif";
export default function Loading(){
    return(
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
            <div className="text-center">잠시만 기다려 주세요...</div>
            <img src={spinner} alt="로딩중" width="10%"></img>
        </div>
    )
}