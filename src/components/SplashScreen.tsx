import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import logoAsset from "@/assets/faster-logo-white.png"; 

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); 
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0A0A]"
        >
          {/* اللوجو يبدأ ظاهراً بالكامل ليطابق شاشة النظام دون تقطيع */}
          <motion.img
            src={logoAsset}
            alt="Faster Logo"
            initial={{ scale: 1, opacity: 1 }} 
            animate={{ scale: 1.05 }} // تكبير بطيء جداً يعطي إحساساً بالحركة دون اختفاء
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-28 object-contain"
          />
          
          {/* حركة ظهور النص أسفل اللوجو تتأخر قليلاً لتلفت الانتباه */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-2 text-center"
          >
            <h1 className="text-4xl font-black tracking-widest text-white uppercase">
              Faster
            </h1>
            <p className="mt-1 text-sm font-medium tracking-wide text-[#FACC15]">
              Auto Spare Parts
            </p>
          </motion.div>

          {/* توقيع المطور */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="absolute bottom-10 flex flex-col items-center gap-1"
          >
            <span className="text-[10px] font-medium tracking-widest text-gray-500 uppercase">
              Powered by
            </span>
            <div className="text-xl font-bold tracking-wider bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">
              {"<M.Mady />"}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}