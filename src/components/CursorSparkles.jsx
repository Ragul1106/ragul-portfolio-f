// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const colors = ["#FFD700", "#FF69B4", "#7FFFD4", "#00BFFF", "#FF4500"];

// const CursorSparkles = () => {
//   const [sparkles, setSparkles] = useState([]);

//   const generateSparkle = (x, y) => {
//     const id = Date.now() + Math.random();
//     const size = Math.random() * 6 + 4;
//     const color = colors[Math.floor(Math.random() * colors.length)];
//     setSparkles((prev) => [...prev, { id, x, y, size, color }]);
//     setTimeout(() => {
//       setSparkles((prev) => prev.filter((s) => s.id !== id));
//     }, 700);
//   };

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       generateSparkle(e.clientX, e.clientY);
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   return (
//     <AnimatePresence>
//       {sparkles.map((s) => (
//         <motion.div
//           key={s.id}
//           initial={{ opacity: 1, scale: 1 }}
//           animate={{ opacity: 0, scale: 0 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.7, ease: "easeOut" }}
//           style={{
//             position: "fixed",
//             left: s.x,
//             top: s.y,
//             width: s.size,
//             height: s.size,
//             borderRadius: "50%",
//             backgroundColor: s.color,
//             pointerEvents: "none",
//             zIndex: 9999,
//             boxShadow: `0 0 10px ${s.color}`,
//           }}
//         />
//       ))}
//     </AnimatePresence>
//   );
// };

// export default CursorSparkles;


import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const colors = ["#FFD700", "#FF69B4", "#7FFFD4", "#00BFFF", "#FF4500"];

const CursorSparkles = () => {
  const [sparkles, setSparkles] = useState([]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const generateSparkle = (x, y) => {
    const id = Date.now() + Math.random();
    const size = Math.random() * 6 + 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    setSparkles((prev) => [...prev, { id, x, y, size, color }]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== id));
    }, 700);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      generateSparkle(e.clientX, e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <motion.div
        animate={{ x: cursorPos.x - 10, y: cursorPos.y - 10 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[10000]"
        style={{
          background: "transparent",
          border: "2px solid #FF69B4",
          boxShadow: "0 0 10px #FF69B4",
        }}
      />

      {/* Sparkles */}
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              position: "fixed",
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              backgroundColor: s.color,
              pointerEvents: "none",
              zIndex: 9999,
              boxShadow: `0 0 10px ${s.color}`,
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

export default CursorSparkles;
