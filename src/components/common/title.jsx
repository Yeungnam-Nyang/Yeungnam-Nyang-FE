import icon from "../../assets/images/icon_pow.png";
import icon_fire from "../../assets/images/icon_fire.png";

export default function Title({ text, select = "paw" }) {
  return (
    <div className="flex items-center p-3 gap-4 ">
      <img
        alt="foot"
        src={select === "fire" ? icon_fire : icon}
        className="w-12 h-auto"
      />
      <h1 className="font-['Bungee'] text-4xl">{text}</h1>
    </div>
  );
}
