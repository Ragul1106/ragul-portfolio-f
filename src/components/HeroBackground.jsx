// src/components/HeroBackground.jsx
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function HeroBackground() {
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);

  // Mouse motion for parallax
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

  // Shooting stars
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
      setTimeout(
        () => setShootingStars((prev) => prev.filter((s) => s.id !== newStar.id)),
        newStar.duration * 1000
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 -z-20 bg-black overflow-hidden">
      {/* Stars */}
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

      {/* Shooting Stars */}
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

      {/* Aurora */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(0,200,255,0.2), transparent 60%), radial-gradient(circle at 80% 70%, rgba(255,0,150,0.15), transparent 70%)",
        }}
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-20 w-40 h-40 rounded-full bg-purple-500/20 blur-3xl -z-10"
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-52 h-52 rounded-full bg-blue-500/20 blur-3xl -z-10"
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
      />
    </div>
  );
}
