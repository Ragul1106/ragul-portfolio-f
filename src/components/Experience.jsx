// Experience.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react"; 

const API_ROOT = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);

  useEffect(() => {
    axios.get(`${API_ROOT}/experiences/`).then((res) => setExperiences(res.data));
    axios.get(`${API_ROOT}/education/`).then((res) => setEducation(res.data));
  }, []);

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section id="resume" className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="border-b-4 border-yellow-400 pb-2">Resume</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Experience Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
              <Briefcase className="text-yellow-400" /> Experience
            </h3>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8 border-l-4 border-yellow-400 pl-6"
            >
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  custom={i}
                  className="relative"
                >
                  <div className="absolute -left-10 top-2 bg-yellow-400 p-2 rounded-full shadow-md">
                    <Briefcase size={18} className="text-gray-900" />
                  </div>
                  <div className="border border-yellow-400 p-5 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 bg-gray-800">
                    <h4 className="text-lg font-semibold text-yellow-300">
                      {exp.title} – {exp.company}
                    </h4>
                    <p className="text-gray-400 text-sm italic">
                      {exp.start_date} – {exp.end_date || "Present"}
                    </p>
                    <p className="mt-3 text-gray-300 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Education Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
              <GraduationCap className="text-yellow-400" /> Education
            </h3>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8 border-l-4 border-yellow-400 pl-6"
            >
              {education.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  variants={itemVariants}
                  custom={i}
                  className="relative"
                >
                  <div className="absolute -left-10 top-2 bg-yellow-400 p-2 rounded-full shadow-md">
                    <GraduationCap size={18} className="text-gray-900" />
                  </div>
                  <div className="border border-yellow-400 p-5 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 bg-gray-800">
                    <h4 className="text-lg font-semibold text-yellow-300">
                      {edu.level} – {edu.institution}
                    </h4>
                    <p className="text-gray-400 text-sm italic">
                      {edu.course} <br />
                      {edu.start_year} – {edu.end_year}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
