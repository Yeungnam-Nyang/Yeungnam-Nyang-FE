import { Link } from "react-router-dom";
import { FaPen, FaUserPlus } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
export default function Header() {
  return (
    <nav className="max-w-[768px] fixed top-0  w-full h-20 bg-yellow shadow-global flex gap-4 justify-between align-middle items-center px-3">
      {/* 홈으로 이동 */}
      <Link to="/" className="">
        <img src={logo} alt="logo" className="h-16 w-auto" />
      </Link>
      <div className="flex flex-row gap-4 ">
        <Link to="/post/write" className="hover:scale-125 duration-500">
          <FaPen size={25} color="#000000" />
        </Link>
        {/* 친구 추가 팝업창 */}
        <button>
          <FaUserPlus
            size={25}
            color="#000000"
            className="hover:scale-125 duration-500"
          />
        </button>
      </div>
    </nav>
  );
}
