import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchProfile } from "../api/api"; // ✅ API import

export default function About({ profile: profileProp }) {
  const [profile, setProfile] = useState(profileProp || null);

  // Fetch profile if not passed via props
  useEffect(() => {
    if (!profileProp) {
      fetchProfile()
        .then((res) => setProfile(res.data))
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, [profileProp]);

  const fullText =
    profile?.bio ||
    "Write your professional bio in Django admin. This text is loaded from the API.";

  const [displayedText, setDisplayedText] = useState("");

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [fullText]);

  const letters = displayedText.split("");

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>

        {/* Bio */}
        <motion.p
          className="text-lg text-white dark:text-gray-300 leading-relaxed max-w-5xl mx-auto mt-6 flex flex-wrap justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {letters.map((char, i) => (
            <motion.span
              key={i}
              className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 animate-gradient-shimmer"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: [0, -2, 0] }}
              transition={{
                delay: i * 0.03,
                duration: 2,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.p>

        {/* Skills */}
        <motion.div className="mt-12">
          <motion.h3
            className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Skills
          </motion.h3>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            {(profile?.skills || []).map((s, i) => (
              <motion.span
                key={s}
                className="px-5 py-2 rounded-full text-sm font-semibold shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white cursor-pointer relative overflow-hidden"
                whileHover={{
                  scale: 1.15,
                  rotate: [0, -6, 6, 0],
                  boxShadow: "0px 0px 18px rgba(255, 105, 180, 0.8)",
                  transition: { duration: 0.4, delay: i * 0.05 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 bg-white/10 blur-lg rounded-full opacity-0 hover:opacity-100 transition duration-500"></span>
                {s}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

