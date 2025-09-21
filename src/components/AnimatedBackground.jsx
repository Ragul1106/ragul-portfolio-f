import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function StarfieldBackground() {
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);

  // Mouse motion
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const offsetX = useTransform(mouseX, [0, window.innerWidth], [-50, 50]);
  const offsetY = useTransform(mouseY, [0, window.innerHeight], [-50, 50]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Generate stars
  useEffect(() => {
    const generatedStars = [];
    const numStars = 200;
    for (let i = 0; i < numStars; i++) {
      const layer = Math.random() < 0.5 ? 1 : 2;
      generatedStars.push({
        id: i,
        size: Math.random() * 2 + (layer === 2 ? 1 : 0),
        top: Math.random() * 100 + "%",
        left: Math.random() * 100 + "%",
        duration: Math.random() * 15 + (layer === 2 ? 25 : 15),
        delay: Math.random() * 10,
        opacity: Math.random() * 0.8 + 0.2,
        layer,
      });
    }
    setStars(generatedStars);
  }, []);

  // Generate shooting stars randomly
  useEffect(() => {
    const interval = setInterval(() => {
      const newStar = {
        id: Date.now(),
        top: Math.random() * 60 + "%",
        left: "-10%",
        length: Math.random() * 150 + 100,
        duration: Math.random() * 1 + 1,
      };
      setShootingStars((prev) => [...prev, newStar]);

      // Remove shooting star after duration
      setTimeout(() => {
        setShootingStars((prev) => prev.filter((s) => s.id !== newStar.id));
      }, newStar.duration * 1000);
    }, 2000); // every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      {/* Regular stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: star.top,
            left: star.left,
            opacity: star.opacity,
            x: star.layer === 2 ? offsetX : "0px",
            y: star.layer === 2 ? offsetY : "0px",
          }}
          animate={{
            y: ["0px", "800px"],
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: star.duration,
            delay: star.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute bg-white rounded-full"
          style={{
            width: "2px",
            height: `${s.length}px`,
            top: s.top,
            left: s.left,
            opacity: 0.8,
            rotate: -45,
            transformOrigin: "top left",
          }}
          animate={{ x: "120vw", y: "120vh", opacity: [0.8, 0.2] }}
          transition={{ duration: s.duration, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
