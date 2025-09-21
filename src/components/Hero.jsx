import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero({ profile }) {
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const navigate = useNavigate();

  // Mouse motion values for subtle parallax
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
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{ paddingTop: "72px" }}
    >
      {/* Starfield background */}
      <div className="absolute inset-0 -z-20 bg-black">
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

        {/* Aurora gradient waves */}
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, rgba(0,200,255,0.2), transparent 60%), radial-gradient(circle at 80% 70%, rgba(255,0,150,0.15), transparent 70%)",
          }}
          animate={{ opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
        />
      </div>

      {/* Floating glowing orbs */}
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

      {/* Hero content */}
      <div className="w-full grid md:grid-cols-2 gap-8 items-center relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Typewriter effect */}
          <motion.h1
            className="text-4xl md:text-6xl pb-5 font-extrabold text-white"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{ overflow: "hidden", whiteSpace: "nowrap" }}
          >
            {profile?.name || "Ragul R"}
          </motion.h1>

          <motion.p
            className="mt-3 text-xl text-gray-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {profile?.title || "Full Stack Developer — React • Django • Tailwind"}
          </motion.p>

          <motion.div
            className="mt-6 flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <a
              href={profile?.resume_url || "#"}
              className="relative inline-block px-6 py-2 cursor-pointer rounded bg-blue-600 text-white font-semibold transition overflow-hidden"
            >
              <span className="relative z-10">Download Resume</span>
              <motion.span
                className="absolute inset-0 bg-blue-400"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.4 }}
              />
            </a>

            <button
              onClick={() => navigate("/projects")}
              className="relative inline-block px-6 py-2 rounded cursor-pointer bg-purple-600 text-white font-semibold transition overflow-hidden"
            >
              <span className="relative z-10">Discover Projects</span>
              <motion.span
                className="absolute inset-0 bg-purple-400"
                initial={{ y: "100%" }}
                whileHover={{ y: "0%" }}
                transition={{ duration: 0.4 }}
              />
            </button>
          </motion.div>
        </motion.div>

        {/* Profile image with glow */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {profile?.profile_image ? (
            <motion.img
              src={profile.profile_image}
              alt="profile"
              className="w-56 h-56 object-cover rounded-2xl shadow-xl"
              animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 20px #9333ea", "0 0 40px #3b82f6", "0 0 20px #9333ea"] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          ) : (
            <div className="w-56 h-56 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold">
              Logo
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}







// import React, { useEffect, useState } from "react";
// import { motion, useMotionValue, useTransform } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// export default function Hero() {
//   const [stars, setStars] = useState([]);
//   const [shootingStars, setShootingStars] = useState([]);
//   const navigate = useNavigate();

//   // Mouse parallax
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
//   const offsetX = useTransform(mouseX, [0, window.innerWidth], [-50, 50]);
//   const offsetY = useTransform(mouseY, [0, window.innerHeight], [-50, 50]);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       mouseX.set(e.clientX);
//       mouseY.set(e.clientY);
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, [mouseX, mouseY]);

//   // Stars
//   useEffect(() => {
//     const generatedStars = [];
//     const numStars = 200;
//     for (let i = 0; i < numStars; i++) {
//       const layer = Math.random() < 0.5 ? 1 : 2;
//       generatedStars.push({
//         id: i,
//         size: Math.random() * 2 + (layer === 2 ? 1 : 0),
//         top: Math.random() * 100 + "%",
//         left: Math.random() * 100 + "%",
//         duration: Math.random() * 15 + (layer === 2 ? 25 : 15),
//         delay: Math.random() * 10,
//         opacity: Math.random() * 0.8 + 0.2,
//         layer,
//       });
//     }
//     setStars(generatedStars);
//   }, []);

//   // Shooting stars
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newStar = {
//         id: Date.now(),
//         top: Math.random() * 60 + "%",
//         left: "-10%",
//         length: Math.random() * 150 + 100,
//         duration: Math.random() * 1 + 1,
//       };
//       setShootingStars((prev) => [...prev, newStar]);
//       setTimeout(
//         () => setShootingStars((prev) => prev.filter((s) => s.id !== newStar.id)),
//         newStar.duration * 1000
//       );
//     }, 2500);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section
//       className="relative min-h-[90vh] flex items-center overflow-hidden"
//       style={{ paddingTop: "72px" }}
//     >
//       {/* Background stars */}
//       <div className="absolute inset-0 -z-20 bg-black">
//         {stars.map((star) => (
//           <motion.div
//             key={star.id}
//             className="absolute bg-white rounded-full"
//             style={{
//               width: `${star.size}px`,
//               height: `${star.size}px`,
//               top: star.top,
//               left: star.left,
//               opacity: star.opacity,
//               x: star.layer === 2 ? offsetX : "0px",
//               y: star.layer === 2 ? offsetY : "0px",
//             }}
//             animate={{
//               y: ["0px", "800px"],
//               opacity: [star.opacity, star.opacity * 0.3, star.opacity],
//             }}
//             transition={{
//               repeat: Infinity,
//               repeatType: "loop",
//               duration: star.duration,
//               delay: star.delay,
//               ease: "linear",
//             }}
//           />
//         ))}

//         {shootingStars.map((s) => (
//           <motion.div
//             key={s.id}
//             className="absolute bg-white rounded-full"
//             style={{
//               width: "2px",
//               height: `${s.length}px`,
//               top: s.top,
//               left: s.left,
//               opacity: 0.8,
//               rotate: -45,
//               transformOrigin: "top left",
//             }}
//             animate={{ x: "120vw", y: "120vh", opacity: [0.8, 0.2] }}
//             transition={{ duration: s.duration, ease: "easeOut" }}
//           />
//         ))}
//       </div>

//       {/* Hero content */}
//       <div className="w-full grid md:grid-cols-2 gap-8 items-center relative z-10 px-6">
//         <motion.div
//           initial={{ opacity: 0, x: -40 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//         >
//           {/* Name */}
//           <h1 className="text-4xl md:text-6xl font-extrabold text-white">
//             Ragul R
//           </h1>

//           {/* Title */}
//           <p className="mt-3 text-xl text-gray-300">
//             Full Stack Developer — React • Django • Tailwind
//           </p>

//           {/* Bio */}
//           <p className="mt-4 text-lg text-gray-400 max-w-xl">
//             Passionate developer crafting modern, scalable applications with
//             cutting-edge tech. I love building seamless digital experiences and
//             solving real-world problems with code.
//           </p>

//           {/* Skills */}
//           <div className="mt-4 flex flex-wrap gap-2">
//             {["React", "Django", "Tailwind", "MySQL", "Flask", "Node.js"].map(
//               (skill, i) => (
//                 <motion.span
//                   key={i}
//                   className="px-3 py-1 bg-white/10 text-white rounded-full text-sm"
//                   whileHover={{ scale: 1.1 }}
//                 >
//                   {skill}
//                 </motion.span>
//               )
//             )}
//           </div>

//           {/* Stats */}
//           <div className="mt-8 flex gap-8 text-center">
//             <div>
//               <h3 className="text-3xl font-bold text-white">20+</h3>
//               <p className="text-gray-400">Projects</p>
//             </div>
//             <div>
//               <h3 className="text-3xl font-bold text-white">2+</h3>
//               <p className="text-gray-400">Years Experience</p>
//             </div>
//             <div>
//               <h3 className="text-3xl font-bold text-white">10+</h3>
//               <p className="text-gray-400">Skills</p>
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="mt-6 flex gap-4">
//             <a
//               href="#"
//               className="relative inline-block px-6 py-2 rounded bg-blue-600 text-white font-semibold transition"
//             >
//               Download Resume
//             </a>
//             <button
//               onClick={() => navigate("/projects")}
//               className="relative inline-block px-6 py-2 rounded bg-purple-600 text-white font-semibold transition"
//             >
//               Discover Projects
//             </button>
//           </div>

//           {/* Social Links */}
//           <div className="mt-6 flex gap-6">
//             <a
//               href="https://github.com/yourusername"
//               target="_blank"
//               className="text-gray-300 hover:text-white"
//             >
//               <i className="fab fa-github text-2xl"></i>
//             </a>
//             <a
//               href="https://linkedin.com/in/yourusername"
//               target="_blank"
//               className="text-gray-300 hover:text-white"
//             >
//               <i className="fab fa-linkedin text-2xl"></i>
//             </a>
//             <a
//               href="mailto:yourmail@example.com"
//               className="text-gray-300 hover:text-white"
//             >
//               <i className="fas fa-envelope text-2xl"></i>
//             </a>
//           </div>
//         </motion.div>

//         {/* Profile Image */}
//         <motion.div
//           className="flex justify-center"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <motion.img
//             src="https://via.placeholder.com/250"
//             alt="profile"
//             className="w-56 h-56 object-cover rounded-2xl shadow-xl"
//             animate={{
//               scale: [1, 1.05, 1],
//               boxShadow: [
//                 "0 0 20px #9333ea",
//                 "0 0 40px #3b82f6",
//                 "0 0 20px #9333ea",
//               ],
//             }}
//             transition={{ duration: 4, repeat: Infinity }}
//           />
//         </motion.div>
//       </div>
//     </section>
//   );
// }
