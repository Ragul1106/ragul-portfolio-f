// Experience.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

const API_ROOT = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export default function Experience() {
    const [experiences, setExperiences] = useState([]);
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        Promise.all([
            axios.get(`${API_ROOT}/experiences/`),
            axios.get(`${API_ROOT}/education/`),
        ])
            .then(([expRes, eduRes]) => {
                if (!mounted) return;
                setExperiences(Array.isArray(expRes.data) ? expRes.data : []);
                setEducation(Array.isArray(eduRes.data) ? eduRes.data : []);
            })
            .catch((e) => console.error("Resume fetch failed:", e))
            .finally(() => mounted && setLoading(false));

        return () => (mounted = false);
    }, []);

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };
    const skeletonVariants = {
        pulse: {
            opacity: [0.4, 1, 0.4],
            transition: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
        },
    };

    const renderSkeletons = (count = 3) =>
        Array.from({ length: count }).map((_, i) => (
            <motion.div
                key={i}
                variants={skeletonVariants}
                animate="pulse"
                className="relative border border-yellow-400 rounded-lg shadow-lg p-5 flex flex-col justify-between min-h-[160px] bg-gray-800"
            >
                <div className="absolute -left-10 top-2 bg-yellow-400 p-2 rounded-full shadow-md w-6 h-6" />
                <div className="h-5 bg-gray-700 rounded mb-2 w-3/4" />
                <div className="h-3 bg-gray-700 rounded mb-2 w-1/2" />
                <div className="h-3 bg-gray-700 rounded w-full mt-3" />
                <div className="h-3 bg-gray-700 rounded w-5/6 mt-2" />
            </motion.div>
        ));
    return (
        <section id="resume" className="py-20 bg-transparent text-white">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-16">
                    <span className="border-b-4 border-yellow-400 pb-2">Resume</span>
                </h2>

                {loading ? (
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>{renderSkeletons(3)}</div>
                        <div>{renderSkeletons(2)}</div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-12">

                        <div>
                            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
                                <Briefcase className="text-yellow-400" /> Experience
                            </h3>

                            <div className="grid gap-8 border-l-4 border-yellow-400 pl-5 auto-rows-fr">
                                {experiences.length === 0 && <p className="text-white">No experience records.</p>}

                                {experiences.map((exp) => (
                                    <motion.div
                                        key={exp.id}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.2 }}
                                        variants={itemVariants}
                                        className="relative"
                                    >
                                        <div className="absolute -left-10 top-2 bg-yellow-400 p-2 rounded-full shadow-md">
                                            <Briefcase size={18} className="text-gray-900" />
                                        </div>

                                        {/* Fixed height card */}
                                        <div className="border border-yellow-400 rounded-lg shadow-lg p-5 flex flex-col justify-between min-h-[160px]">
                                            <div>
                                                <h4 className="text-lg font-semibold text-yellow-300">
                                                    {exp.title} – {exp.company}
                                                </h4>
                                                <p className="text-gray-300 text-sm italic mt-1">
                                                    {exp.start_date || ""} {exp.start_date ? "–" : ""} {exp.end_date || "Present"}
                                                </p>
                                                <p className="mt-3 text-white leading-relaxed">
                                                    {exp.description || "No description available"}
                                                </p>
                                                {exp.location && <p className="mt-2 text-white text-sm">{exp.location}</p>}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
                                <GraduationCap className="text-yellow-400" /> Education
                            </h3>

                            <div className="grid gap-8 border-l-4 border-yellow-400 pl-5 auto-rows-fr">
                                {education.length === 0 && <p className="text-white">No education records.</p>}

                                {education.map((edu) => (
                                    <motion.div
                                        key={edu.id}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.2 }}
                                        variants={itemVariants}
                                        className="relative"
                                    >
                                        <div className="absolute -left-10 top-2 bg-yellow-400  p-2 rounded-full shadow-md">
                                            <GraduationCap size={18} className="text-gray-900" />
                                        </div>

                                        {/* Fixed height card */}
                                        <div className="border border-yellow-400 rounded-lg shadow-lg  p-5 flex flex-col justify-between min-h-[180px]">
                                            <div>
                                                <h4 className="text-lg font-semibold text-yellow-300">
                                                    {edu.level} – {edu.institution}
                                                </h4>
                                                <p className="text-white  text-sm italic mt-5">
                                                    {edu.course && <><span>{edu.course}</span><br /></>}
                                                </p>
                                                <p className="mt-5"> <span>{edu.start_year || ""} {edu.start_year ? "–" : ""} {edu.end_year || "Present"}</span> </p>
                                                {edu.location && <p className="mt-5 text-white text-sm">{edu.location}</p>}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
