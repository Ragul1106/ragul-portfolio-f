import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  const navLinks = [
    { label: "About", path: "/about" },
    { label: "Experience", path: "/experience" },
    { label: "Projects", path: "/projects" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-2 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50 px-6 py-3 
      bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg flex justify-between items-center
      transition-all duration-300">
     
      <motion.div
        whileHover={{ scale: 1.1, textShadow: "0px 0px 8px #a855f7" }}
        whileTap={{ scale: 0.95 }}
        className="text-white font-extrabold text-2xl cursor-pointer tracking-wide"
        onClick={() => handleNavigate("/")}
      >
        MyPortfolio<span className="text-purple-400">.</span>
      </motion.div>

      <div className="hidden md:flex gap-12 mx-10 text-white font-medium">
        {navLinks.map((link) => (
          <motion.button
            key={link.path}
            onClick={() => handleNavigate(link.path)}
            className="relative group transition cursor-pointer"
            whileHover={{
              scale: 1.1,
              textShadow: "0px 0px 8px #a855f7, 0px 0px 16px #ec4899",
            }}
          >
            {link.label}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 
              bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500
              transition-all duration-300 group-hover:w-full rounded-full"></span>
          </motion.button>
        ))}
      </div>

      <div className="md:hidden flex items-center">
        <motion.button
          onClick={() => setOpen(!open)}
          className="text-white text-3xl"
          whileTap={{ rotate: 90 }}
          whileHover={{ scale: 1.2, color: "#a855f7", textShadow: "0px 0px 10px #a855f7" }}
        >
          {open ? <HiX /> : <HiMenu />}
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute top-full right-0 w-full bg-black/70 backdrop-blur-lg border-t border-purple-500/30 
              flex flex-col gap-6 py-6 px-6 md:hidden shadow-lg"
          >
            <motion.button
              whileHover={{ x: 10, textShadow: "0px 0px 6px #a855f7" }}
              className="text-white text-lg text-left"
              onClick={() => handleNavigate("/")}
            >
              Home
            </motion.button>
            {navLinks.map((link) => (
              <motion.button
                key={link.path}
                whileHover={{ x: 10, textShadow: "0px 0px 6px #a855f7" }}
                className="text-white text-lg text-left"
                onClick={() => handleNavigate(link.path)}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}