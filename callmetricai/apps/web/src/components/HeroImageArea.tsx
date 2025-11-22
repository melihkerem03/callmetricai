"use client";

import { motion } from "framer-motion";

export default function HeroImageArea() {
  return (
    <motion.div
      layoutId="hero-image-area"
      className="flex items-center justify-center self-center"
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ minHeight: "500px" }}
    >
      <div className="relative h-[500px] w-[500px]">
        {/* Dashed circular orbits */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute h-[450px] w-[450px] rounded-full border-2 border-dashed border-gray-300"></div>
          <div className="absolute h-[350px] w-[350px] rounded-full border-2 border-dashed border-gray-300"></div>
        </div>

        {/* Main circular image container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-[400px] w-[400px] rounded-full overflow-hidden bg-gradient-to-br from-cyan-50 to-orange-50 shadow-xl">
            <img
              src="/about-image.jpg"
              alt="CallMetric AI"
              className="h-full w-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

