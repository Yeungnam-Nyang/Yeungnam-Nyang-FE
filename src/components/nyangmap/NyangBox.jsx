import { motion, AnimatePresence } from "framer-motion";
export default function NyangBox({ catNumber }) {
  return (
    <div className="py-10 mx-auto flex gap-10 items-center justify-center rounded-2xl bg-orange border-solid border-darkOrange">
      <img
        src={`${import.meta.env.VITE_PUBLIC_URL}/assets/images/shieldCat.png`}
        alt="냥맵 이미지"
        className="w-20"
      />
      <h1 className="text-white text-2xl font-bold flex items-center">
        주위에 고양이가{" "}
        <AnimatePresence mode="wait">
          <motion.span
            key={catNumber}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -20 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 15,
            }}
            className="text-yellow-300 mx-2 inline-block"
          >
            {catNumber}
          </motion.span>
        </AnimatePresence>
        마리 있어요!
      </h1>
    </div>
  );
}
