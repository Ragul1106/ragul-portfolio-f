import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProjectById } from "../api/api"; 
import Skills from "./Skills";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);

  const softNeonGradients = [
    "linear-gradient(45deg, #2E8BC0, #6A4C93)",
    "linear-gradient(45deg, #8C4B7B, #BF6F92)",
    "linear-gradient(45deg, #3D348B, #6A0572)",
    "linear-gradient(45deg, #4A90E2, #5D5FEF)",
    "linear-gradient(45deg, #6A0572, #8C2F6B)",
    "linear-gradient(45deg, #5D3A00, #9C661F)",
  ];

  useEffect(() => {
    fetchProjectById(id)
      .then((res) => setProject(res.data))
      .catch(() => setError("Failed to load project"));
  }, [id]);

  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;
  if (!project) return <p className="text-center mt-20">Loading...</p>;

  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      {/* Back button */}
      <button
        className="mb-6 text-blue-400 cursor-pointer hover:text-blue-600"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {/* Top: image + description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-80 object-contain rounded-xl shadow-lg"
          />
        )}

        <div>
          <motion.h2
            className="text-4xl font-bold mb-4 pb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {project.title}
          </motion.h2>

          <motion.p
            className="text-gray-300 leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {project.long_description || project.short_description}
          </motion.p>
        </div>
      </div>

      {/* Stacks */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-yellow-400 mb-6">
          Stacks Used
        </h3>
        <div className="flex flex-wrap gap-4 text-gray-300">
          {["FRONTEND", "BACKEND", "DATABASE", "DEPLOYMENT"].map(
            (category, catIdx) => {
              const skills = project[category.toLowerCase()]?.split(",") || [];
              if (!skills.length) return null;

              return (
                <div key={catIdx} className="flex-1 min-w-[120px]">
                  <strong className="block text-yellow-400 mb-2">
                    {category}
                  </strong>
                  <div className="flex flex-col gap-3">
                    {skills.map((skill, idx) => {
                      const gradient =
                        softNeonGradients[idx % softNeonGradients.length];
                      const floatDuration = 3 + Math.random() * 2;
                      const twinkleDuration = 1.5 + Math.random() * 2;
                      const glowDuration = 1.5 + Math.random() * 1.5;

                      return (
                        <motion.span
                          key={idx}
                          className="cosmic-skill"
                          style={{
                            background: gradient,
                            animation: `softGlowPulse ${glowDuration}s ease-in-out infinite, twinkle ${twinkleDuration}s ease-in-out infinite, floatY ${floatDuration}s ease-in-out infinite, gradientShift 6s ease infinite`,
                          }}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            delay: idx * 0.1 + catIdx * 0.2,
                            type: "spring",
                            stiffness: 200,
                          }}
                        >
                          {skill.trim()}
                        </motion.span>
                      );
                    })}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* Links */}
      <div className="mt-10 flex gap-4">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
          >
            GitHub
          </a>
        )}
        {project.project_url && (
          <a
            href={project.project_url}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-pink-500 transition"
          >
            Live Demo
          </a>
        )}
      </div>
    </section>
  );
}
