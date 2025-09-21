import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HeroBackground from "./HeroBackground";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Hero({ profile }) {

 const icons = [
    {
      href: "https://github.com/Ragul1106",
      icon: <FaGithub size={22} />,
      hoverStyle: {
        background:
          "linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)",
        boxShadow: "0px 0px 20px rgba(167,119,227,0.6)",
      },
    },
    {
      href: "https://www.linkedin.com/in/ragulr/",
      icon: <FaLinkedin size={25} />,
      hoverStyle: {
        background:
          "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)", 
        boxShadow: "0px 0px 20px rgba(0,114,255,0.6)",
      },
    },
    {
      href: "https://twitter.com/ragulr",
      icon: <FaTwitter size={25} />,
      hoverStyle: {
        background:
          "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)", 
        boxShadow: "0px 0px 20px rgba(67,206,162,0.6)",
      },
    },
  ];
  const navigate = useNavigate();
  const resumeUrl =
    profile?.resume_url?.trim?.() ||
    "https://drive.google.com/uc?export=download&id=147itFIHg00e_K04aa5ZtCqWTFQAiDM1C";

  const [fgStars, setFgStars] = useState([]);
  const [particles, setParticles] = useState([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const offsetX = useTransform(mouseX, [0, window.innerWidth], [-20, 20]);
  const offsetY = useTransform(mouseY, [0, window.innerHeight], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const newParticle = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.6 + 0.4,
        color: ["#fff", "#f0f", "#0ff"][Math.floor(Math.random() * 3)],
      };
      setParticles((prev) => [...prev, newParticle]);

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 1200);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const stars = [];
    for (let i = 0; i < 50; i++) {
      stars.push({
        id: i,
        size: Math.random() * 2 + 1,
        top: Math.random() * 80 + "%",
        left: Math.random() * 80 + "%",
        opacity: Math.random() * 0.8 + 0.2,
        duration: Math.random() * 2 + 1,
        delay: Math.random() * 2,
      });
    }
    setFgStars(stars);
  }, []);

  const particleLines = [];
  const distanceThreshold = 80;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const p1 = particles[i];
      const p2 = particles[j];
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < distanceThreshold) {
        particleLines.push({ p1, p2, opacity: 1 - dist / distanceThreshold });
      }
    }
  }

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ paddingTop: "72px" }}>
      <HeroBackground />

      {fgStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: star.top,
            left: star.left,
            opacity: star.opacity,
            x: offsetX,
            y: offsetY,
          }}
          animate={{ opacity: [star.opacity, star.opacity * 0.2, star.opacity] }}
          transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, repeatType: "mirror" }}
        />
      ))}

      <svg className="absolute inset-0 -z-10 w-full h-full pointer-events-none">
        {particleLines.map((line, idx) => (
          <line
            key={idx}
            x1={line.p1.x}
            y1={line.p1.y}
            x2={line.p2.x}
            y2={line.p2.y}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
            style={{ opacity: line.opacity }}
          />
        ))}
      </svg>

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            top: p.y,
            left: p.x,
          }}
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -20 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      ))}

      <motion.div
        className="absolute w-72 h-72 rounded-full bg-purple-500/20 blur-3xl -z-10"
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-pink-400/10 blur-3xl -z-10 top-1/4 left-1/3"
        animate={{ x: [0, -80, 0], y: [0, 50, 0] }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-blue-500/20 blur-3xl -z-10 bottom-10 right-1/4"
        animate={{ x: [0, 70, 0], y: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, repeatType: "mirror" }}
      />

      <div className="w-full grid md:grid-cols-2 gap-8 items-center relative z-10 px-6">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
          <motion.h1
            className="text-4xl md:text-6xl pb-5 font-extrabold text-white"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{ overflow: "hidden", whiteSpace: "nowrap" }}
          >
            {profile?.name || "Ragul R"}
          </motion.h1>

          <motion.p className="mt-3 text-2xl text-white">
            {profile?.title || "Full Stack Developer — React • Django • Tailwind"}
          </motion.p>

          <motion.p className="mt-2 text-white text-lg max-w-md">
            I build interactive web apps and scalable backends with modern technologies.
            Let’s create something amazing together!
          </motion.p>

          <motion.div className="mt-6 flex gap-4">
            <a href={resumeUrl} rel="noopener noreferrer" className="relative inline-block px-6 py-2 cursor-pointer rounded bg-blue-600 text-white font-semibold transition overflow-hidden hover:bg-blue-500">
              Download Resume
            </a>
            <button onClick={() => navigate("/projects")} className="relative inline-block px-6 py-2 rounded cursor-pointer bg-purple-600 text-white font-semibold transition overflow-hidden hover:bg-purple-500">
              Discover Projects
            </button>
          </motion.div>

          <motion.div className="mt-6 flex gap-4">
      {icons.map((item, idx) => (
        <motion.a
          key={idx}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center justify-center w-12 h-12 cursor-pointer border-2 border-white rounded-full text-white overflow-hidden"
          whileHover={{
            scale: 1.2,
            rotate: 10,
            background: item.hoverStyle.background,
            boxShadow: item.hoverStyle.boxShadow,
          }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: [0, -6, 0], // floating up & down
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            repeatType: "mirror",
            delay: idx * 0.2, // staggered float
          }}
        >
          {item.icon}
        </motion.a>
      ))}
    </motion.div>


        </motion.div>

        <motion.div className="flex justify-center relative" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
          {profile?.profile_image ? (
            <motion.img
              src={profile.profile_image}
              alt="profile"
              className="w-72 h-72 object-cover rounded-full shadow-xl"
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: ["0 0 20px #9333ea", "0 0 40px #3b82f6", "0 0 20px #9333ea"],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          ) : (
            <div className="w-72 h-72 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
              Logo
            </div>
          )}

          <motion.div
            className="absolute -inset-16 rounded-3xl bg-blue-400/10 blur-3xl"
            animate={{ x: [0, -50, 0], y: [0, 20, 0] }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
