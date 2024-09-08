import icon from "../../assets/images/icon_pow.png";
export default function Title({ text }) {
  return (
    <div className="flex items-center p-3 gap-4 pt-28">
      <img alt="foot" src={icon} className="w-12 h-auto"></img>
      <h1 className="font-['Bungee'] text-4xl">{text}</h1>
    </div>
  );
}
