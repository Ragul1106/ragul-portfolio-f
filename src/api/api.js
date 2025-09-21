// src/api/api.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Existing
export const fetchProfile = () => api.get("/profile/");
export const fetchProjects = () => api.get("/projects/");

// ✅ New
export const fetchProjectById = (id) => api.get(`/projects/${id}/`);

export const postContact = (data) => api.post("/contact/", data);
