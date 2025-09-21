import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false); // close menu on mobile after click
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div
        className="text-white font-bold text-xl cursor-pointer"
        onClick={() => handleNavigate("/")}
      >
        MyPortfolio.
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 text-white">
        <button className="text-white cursor-pointer" onClick={() => navigate("/about")}>About</button>
        <button className="text-white cursor-pointer" onClick={() => navigate("/projects")}>Projects</button>
        <button className="text-white cursor-pointer" onClick={() => navigate("/contact")}>Contact</button>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setOpen(!open)} className="text-white text-2xl">
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-md flex flex-col gap-4 py-4 px-6 md:hidden">
          <button
            className="text-white text-lg text-left"
            onClick={() => handleNavigate("/")}
          >
            Home
          </button>
          <button
            className="text-white text-lg text-left"
            onClick={() => handleNavigate("/about")}
          >
            About
          </button>
          <button
            className="text-white text-lg text-left"
            onClick={() => handleNavigate("/projects")}
          >
            Projects
          </button>
          <button
            className="text-white text-lg text-left"
            onClick={() => handleNavigate("/contact")}
          >
            Contact
          </button>
        </div>
      )}
    </nav>
  );
}
