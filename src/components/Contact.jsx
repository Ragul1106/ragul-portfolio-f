import React, { useState } from "react";
import { postContact } from "../api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const [form, setForm] = useState({
    sender_name: "",
    sender_email: "",
    subject: "",
    message: "",
  });
  const [borderColors, setBorderColors] = useState({
    sender_name: "border-white",
    sender_email: "border-white",
    subject: "border-white",
    message: "border-white",
  });
  const [activeGradient, setActiveGradient] = useState(
    "from-blue-500 via-purple-500 to-pink-500"
  );

  const gradients = [
    "from-pink-500 via-red-500 to-yellow-500",
    "from-purple-500 via-blue-500 to-green-500",
    "from-yellow-500 via-orange-500 to-pink-500",
    "from-green-500 via-teal-500 to-blue-500",
    "from-red-500 via-purple-500 to-pink-500",
    "from-blue-500 via-indigo-500 to-purple-500",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "sender_name") {
      let sanitizedValue = value.replace(/[^A-Za-z\s]/g, ""); 
      sanitizedValue = sanitizedValue.replace(/\s+/g, " "); 
      sanitizedValue = sanitizedValue.replace(/^\s/, ""); 
      setForm({ ...form, [name]: sanitizedValue });

      if (sanitizedValue.trim() !== "") {
        const randomGradient =
          gradients[Math.floor(Math.random() * gradients.length)];
        setBorderColors((prev) => ({
          ...prev,
          [name]: `animated-border bg-gradient-to-r ${randomGradient}`,
        }));
        setActiveGradient(randomGradient);
      } else {
        setBorderColors((prev) => ({ ...prev, [name]: "border-white" }));
      }
      return;
    }

    setForm({ ...form, [name]: value });
    if (value.trim() !== "") {
      const randomGradient =
        gradients[Math.floor(Math.random() * gradients.length)];
      setBorderColors((prev) => ({
        ...prev,
        [name]: `animated-border bg-gradient-to-r ${randomGradient}`,
      }));
      setActiveGradient(randomGradient);
    } else {
      setBorderColors((prev) => ({ ...prev, [name]: "border-white" }));
    }
  };

  const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.sender_name.trim() ||
      !form.sender_email.trim() ||
      !form.subject.trim() ||
      !form.message.trim()
    ) {
      toast.error("Please fill in all fields correctly!");
      return;
    }

    if (!isValidEmail(form.sender_email)) {
    toast.error("Please enter a valid email!");
    return;
  }

    try {
      toast.info("Sending message...");
      await postContact(form);
      toast.success("✅ Message sent successfully!");
      setForm({ sender_name: "", sender_email: "", subject: "", message: "" });
      setBorderColors({
        sender_name: "border-white",
        sender_email: "border-white",
        subject: "border-white",
        message: "border-white",
      });
    } catch (err) {
      console.error(err);
      toast.error("❌ Error sending message. Try again.");
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">
          Contact
        </h2>

        <div className="border-2 border-white rounded-xl p-8 bg-transparent backdrop-blur-md shadow-xl">
          <form onSubmit={handleSubmit} className="grid gap-4">
  
            <input
              name="sender_name"
              value={form.sender_name}
              onChange={handleChange}
              placeholder="Your name"
              className={`p-3 rounded-lg w-full bg-transparent focus:outline-none text-white placeholder-gray-400 border-2 ${borderColors.sender_name}`}
              required
            />

            <input
              name="sender_email"
              value={form.sender_email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
              className={`p-3 rounded-lg w-full bg-transparent focus:outline-none text-white placeholder-gray-400 border-2 ${borderColors.sender_email}`}
              required
            />

            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject"
              className={`p-3 rounded-lg w-full bg-transparent focus:outline-none text-white placeholder-gray-400 border-2 ${borderColors.subject}`}
              required
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your message"
              className={`p-3 rounded-lg w-full bg-transparent focus:outline-none text-white placeholder-gray-400 h-40 border-2 ${borderColors.message}`}
              required
            />

            <div className="flex items-center gap-3 mt-2">
              <button
                type="submit"
                className={`px-6 py-2 cursor-pointer rounded text-white transition bg-gradient-to-r ${activeGradient} animate-gradient`}
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .animated-border {
          background-size: 200% 200%;
          animation: gradientMove 3s ease infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientMove 3s ease infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}
