// App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CursorSparkles from "./components/CursorSparkles";
import AnimatedBackground from "./components/AnimatedBackground";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import ProjectDetail from "./components/ProjectDetail";
import Contact from "./components/Contact";
import { fetchProfile, fetchProjects } from "./api/api";

// Wrapper for pages
// function HomePage({ profile, projects }) {
//   return (
//     <>
//       <Hero profile={profile} />
//       <About profile={profile} />
//       <Projects projects={projects} />
//       <Contact />
//     </>
//   );
// }

function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const p = await fetchProfile();
        setProfile(p.data.length ? p.data[0] : null);

        const projRes = await fetchProjects();
        setProjects(projRes.data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  return (
    <BrowserRouter>
      <CursorSparkles />
      <AnimatedBackground />
      <Navbar />
      <main className="max-w-6xl mx-auto px-4">
        <Routes>
          <Route path="/" element={<Hero profile={profile} projects={projects} />} />
          <Route path="/about" element={<About profile={profile} />} />
          <Route path="/projects" element={<Projects projects={projects} />} />
           <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
