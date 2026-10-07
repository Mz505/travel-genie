import { X } from "lucide-react";

import { motion } from "framer-motion";

import Sidebar from "./Sidebar";

function MobileSidebar({ close }) {
  return (
    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/60
        backdrop-blur-sm
        p-3
        flex
      "
      onClick={close}
    >
      <motion.div
        initial={{
          x: -300,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        exit={{
          x: -300,
          opacity: 0,
        }}
        transition={{
          duration: 0.25,
        }}
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          h-full
          w-[268px]
          max-w-[85vw]
        "
      >
        <Sidebar close={close} />

        <button
          type="button"
          onClick={close}
          className="
            absolute
            top-4
            right-4
            z-[60]
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-xl
            bg-white/10
            text-white
            backdrop-blur-xl
            border
            border-white/20
            hover:bg-red-500
            transition-all
            duration-300
            cursor-pointer
          "
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </motion.div>
    </div>
  );
}

export default MobileSidebar;
