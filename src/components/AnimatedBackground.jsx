import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function StarfieldBackground() {
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [sparkles, setSparkles] = useState([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax offsets
  const moonOffsetX = useTransform(mouseX, [0, window.innerWidth], [-20, 20]);
  const moonOffsetY = useTransform(mouseY, [0, window.innerHeight], [-10, 10]);
  const starOffsetX = useTransform(mouseX, [0, window.innerWidth], [-50, 50]);
  const starOffsetY = useTransform(mouseY, [0, window.innerHeight], [-50, 50]);

  // Mouse tracking
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

  // Generate shooting stars
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
      setTimeout(() => {
        setShootingStars((prev) => prev.filter((s) => s.id !== newStar.id));
      }, newStar.duration * 1000);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Generate glowing sparkles around moon
  useEffect(() => {
    const interval = setInterval(() => {
      const newSparkle = {
        id: Date.now(),
        top: 50 + (Math.random() - 0.5) * 150 + "%",
        left: 50 + (Math.random() - 0.5) * 150 + "%",
        size: Math.random() * 3 + 1,
        duration: Math.random() * 1 + 1,
      };
      setSparkles((prev) => [...prev, newSparkle]);
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, newSparkle.duration * 1000);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      {/* 🌙 Moon with glowing halo */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 80,
          height: 80,
          top: "13%",
          right: "10%",
          x: moonOffsetX,
          y: moonOffsetY,
          overflow: "visible",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: [1, 1.02, 1, 0.98, 1],
          rotate: [0, 2, 0, -2, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Glowing halo */}
        <motion.div
          style={{
            position: "absolute",
            top: "50%",
            right: "50%",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
            transform: "translate(-50%, -50%)",
            zIndex: -1,
          }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Moon surface */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "radial-gradient(circle at 30% 30%, #fdfdfd, #d9d9d9 60%, #aaa 100%)",
            boxShadow: "0 0 50px 15px rgba(255, 255, 255, 0.15)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Craters */}
          <div
            style={{
              position: "absolute",
              width: 15,
              height: 15,
              borderRadius: "50%",
              background: "#ccc",
              top: "25%",
              left: "30%",
              boxShadow: "0 0 8px rgba(0,0,0,0.3)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#bbb",
              top: "60%",
              left: "55%",
              boxShadow: "0 0 5px rgba(0,0,0,0.25)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#ccc",
              top: "40%",
              left: "70%",
              boxShadow: "0 0 6px rgba(0,0,0,0.25)",
            }}
          />
        </div>

        {/* Glowing sparkles */}
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            style={{
              position: "absolute",
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.8)",
              boxShadow: `0 0 ${s.size * 3}px ${s.size}px rgba(255,255,255,0.7)`,
            }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: s.duration, repeat: 0, ease: "easeInOut" }}
          />
        ))}
      </motion.div>

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
            x: star.layer === 2 ? starOffsetX : 0,
            y: star.layer === 2 ? starOffsetY : 0,
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
            width: 2,
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
