import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { fetchProjects } from "../api/api"; // import from your api file

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(2);
  const navigate = useNavigate();

  // Responsive cards per page
  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth < 640) setCardsPerPage(1);
      else setCardsPerPage(2);
    };
    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  // Fetch projects via API file
  useEffect(() => {
    fetchProjects()
      .then((res) => setProjects(res.data.results || res.data || []))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  const totalPages = Math.ceil(projects.length / cardsPerPage);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages - 1));
  const handleDotClick = (idx) => setPage(idx);

  const startIdx = page * cardsPerPage;
  const visibleProjects = projects.slice(startIdx, startIdx + cardsPerPage);

  const swipeConfidenceThreshold = 1000;
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  const handleDragEnd = (event, info) => {
    const swipe = swipePower(info.offset.x, info.velocity.x);
    if (swipe < -swipeConfidenceThreshold) handleNext();
    else if (swipe > swipeConfidenceThreshold) handlePrev();
  };

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-transparent" />

      <motion.h2
        className="relative z-10 text-3xl md:text-4xl pb-4 font-bold mb-10 text-center bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Projects
      </motion.h2>

      <div className="relative z-10 flex items-center justify-center">
        <button
          onClick={handlePrev}
          disabled={page === 0}
          className="absolute left-2 sm:left-6 md:left-10 text-white bg-black/50 p-3 sm:p-4 rounded-full hover:bg-black/70 transition disabled:opacity-50 z-20"
        >
          <FiChevronLeft size={28} />
        </button>

        <AnimatePresence initial={false} mode="wait">
          <motion.div
            className="flex gap-6 sm:gap-8 md:gap-10 overflow-hidden cursor-grab"
            key={page}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            {visibleProjects.map((p) => (
              <motion.div
                key={p.id}
                className={`min-w-[${cardsPerPage === 1 ? "90%" : "260px"}] sm:min-w-[${cardsPerPage === 1 ? "80%" : "300px"}] md:min-w-[400px] max-w-[400px] bg-transparent border border-gray-700 rounded-2xl shadow-lg p-4 cursor-pointer backdrop-blur-md flex-shrink-0`}
                whileHover={{ scale: 1.05, rotate: 1 }}
                onClick={() => navigate(`/projects/${p.id}`)}
              >
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-48 sm:h-52 md:h-56 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="w-full h-48 sm:h-52 md:h-56 border border-gray-600 rounded-lg flex items-center justify-center mb-4 text-gray-400">
                    No Image
                  </div>
                )}

                <h3 className="font-bold text-lg bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text">
                  {p.title}
                </h3>

                <p className="mt-2 text-sm text-gray-200 overflow-hidden text-ellipsis line-clamp-3">
                  {p.short_description}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {(p.technologies || []).map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 border border-gray-500 rounded-full text-gray-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  {p.github_url && (
                    <a
                      href={p.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition"
                    >
                      GitHub
                    </a>
                  )}
                  {p.project_url && (
                    <a
                      href={p.project_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-pink-500 transition"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <button
          onClick={handleNext}
          disabled={page === totalPages - 1}
          className="absolute right-2 sm:right-6 md:right-10 text-white bg-black/50 p-3 sm:p-4 rounded-full hover:bg-black/70 transition disabled:opacity-50 z-20"
        >
          <FiChevronRight size={28} />
        </button>
      </div>

      {/* Clickable Pagination Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`w-3 h-3 rounded-full ${
              i === page ? "bg-blue-500" : "bg-gray-700"
            } hover:scale-110 transition-transform`}
          ></button>
        ))}
      </div>
    </section>
  );
}





// import React, { useEffect, useState } from "react";
// import { motion, useMotionValue, useTransform } from "framer-motion";
// import { useNavigate } from "react-router-dom"; // <-- import
// import axios from "axios";

// export default function Projects() {
//   const [projects, setProjects] = useState([]);
//   const [stars, setStars] = useState([]);
//   const [shootingStars, setShootingStars] = useState([]);
//   const navigate = useNavigate(); // <-- init navigate

//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
//   const offsetX = useTransform(mouseX, [0, window.innerWidth], [-50, 50]);
//   const offsetY = useTransform(mouseY, [0, window.innerHeight], [-50, 50]);

//   useEffect(() => {
//     // fetch projects from API
// axios.get("http://127.0.0.1:8000/api/projects/")
//   .then(res => setProjects(res.data.results || res.data || []));



//     const handleMouseMove = (e) => {
//       mouseX.set(e.clientX);
//       mouseY.set(e.clientY);
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, [mouseX, mouseY]);

//   // Generate stars
//   useEffect(() => {
//     const generatedStars = [];
//     const numStars = 150;
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
//     <section className="relative py-20 overflow-hidden">
//       {/* Starfield Background */}
//       <div className="absolute inset-0 -z-10 bg-black">
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

//       {/* Section content */}
//       <div className="relative max-w-6xl mx-auto px-6">
//         <motion.h2
//           className="text-3xl md:text-4xl font-bold mb-10 text-center bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text"
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           Projects
//         </motion.h2>

//         {/* Masonry Grid */}
//         <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
//           {projects.map((p) => (
//             <motion.div
//               key={p.id}
//               className="bg-transparent border border-gray-700 rounded-2xl shadow-lg p-4 hover:shadow-2xl cursor-pointer backdrop-blur-md break-inside-avoid"
//               whileHover={{ scale: 1.03, y: -3 }}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//               onClick={() => navigate(`/projects/${p.id}`)} // <-- navigate to spec page
//             >
//               {p.image ? (
//                 <img
//                   src={p.image}
//                   alt={p.title}
//                   className="w-full h-44 object-cover rounded-lg mb-4"
//                 />
//               ) : (
//                 <div className="w-full h-44 border border-gray-600 rounded-lg flex items-center justify-center mb-4 text-gray-400">
//                   No Image
//                 </div>
//               )}

//               <h3 className="font-bold text-lg bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text">
//                 {p.title}
//               </h3>

//               <p className="mt-2 text-sm text-gray-200 dark:text-gray-300 overflow-hidden text-ellipsis line-clamp-3">
//                 {p.short_description}
//               </p>

//               <div className="mt-3 flex flex-wrap gap-2">
//                 {(p.technologies || []).map((t) => (
//                   <span
//                     key={t}
//                     className="text-xs px-2 py-1 border border-gray-500 rounded-full text-gray-300"
//                   >
//                     {t}
//                   </span>
//                 ))}
//               </div>

//               <div className="mt-4 flex gap-3">
//                 {p.github_url && (
//                   <a
//                     href={p.github_url}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition"
//                   >
//                     GitHub
//                   </a>
//                 )}
//                 {p.project_url && (
//                   <a
//                     href={p.project_url}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="text-sm px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-pink-500 transition"
//                   >
//                     Live Demo
//                   </a>
//                 )}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }