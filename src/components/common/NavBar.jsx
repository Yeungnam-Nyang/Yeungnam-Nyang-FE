import icon_cat from "../../assets/images/Icon_cat.png";
import icon_house from "../../assets/images/Icon_house.png";
import icon_people from "../../assets/images/Icon_people.png";
import icon_account from "../../assets/images/Icon_account.png";
import { Link } from "react-router-dom";
export default function NavBar() {
  const itemArray = [
    [icon_house, "HOME", "/"],
    [icon_cat, "MAP", "/catmap"],
    [icon_people, "FRIEND", "/friend"],
    [icon_account, "PROFILE", "/profile"],
  ];
  return (
    <nav className="z-10 h-20 max-w-[768px] flex py-2 gap-3 fixed bottom-0 w-full justify-evenly  bg-orange">
        {/* 하단바 스타일링 및 경로 설정 */}
      {itemArray.map((item, idx) => {
        return (
          <Link key={idx} to={item[2]} className="hover:scale-125 duration-500">
            <div className="flex-col ">
              <div className="flex">
                <img
                  alt={item[0]}
                  src={item[0]}
                  className="w-12  m-auto"
                />
              </div>
              <h2 className="font-['Bungee'] text-white text-xl">{item[1]}</h2>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
