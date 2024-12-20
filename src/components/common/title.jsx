
export default function Title({ text, select = "paw" }) {
  return (
    <div className="flex items-center p-3 gap-4 ">
      <img
        alt="foot"
        src={
          select === "fire"
            ? `${import.meta.env.VITE_PUBLIC_URL}/assets/images/Icon_fire.png`
            : `${import.meta.env.VITE_PUBLIC_URL}/assets/images/icon_pow.png`
        }
        className="w-12 h-auto"
      />
      <h1 className="font-['Bungee'] text-4xl">{text}</h1>
    </div>
  );
}
