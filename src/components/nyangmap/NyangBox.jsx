import cat_img from "../../assets/images/shieldCat.png";
export default function NyangBox({catNumber}){
    return(
        <div className="py-10 mx-auto flex gap-10 items-center justify-center rounded-2xl bg-orange border-solid border-darkOrange">
            <img src={cat_img} alt="냥맵 이미지" className="w-20"/>
            <h1 className="text-white text-2xl font-bold">주위에 고양이가 {catNumber}마리 있어요! </h1>
        </div>
    )
}