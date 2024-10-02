import Button from "./Button";
import ReactDOM from "react-dom";
export default function Modal({
  title,
  inputText,
  onClick,
  type,
  isOpen,
  onClose,
}) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white p-10 rounded-2xl shadow-global min-w-[60vw] h-80 flex flex-col gap-4 relative z-5">
        <h2 className="font-['BagelFatOne'] text-4xl">{title}</h2>
        <input
          className=" border-solid border-black border-[1px] h-14 p-3 rounded-full"
          type="text"
          placeholder={inputText}
        ></input>
        <Button text={"확인"} type={type} isValid={true} onClick={onClick} />
        <button
          className="absolute top-5 right-5 font-bold text-3xl"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
