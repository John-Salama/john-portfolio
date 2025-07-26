"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Github,
  Mail,
  ExternalLink,
  MapPin,
  Phone,
  Star,
  ArrowRight,
  Download,
  Sparkles,
  Code,
  Palette,
  Rocket,
  Heart,
  Coffee,
  Zap,
  Menu,
  X,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  links: {
    website?: string;
    github?: string;
    npm?: string;
    behance?: string;
    playstore?: string;
  };
  image: string;
  featured: boolean;
}

// Liquid Morphing Background Component
function LiquidBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient
            id="liquid-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#667eea" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#764ba2" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#f093fb" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,500 C200,400 400,600 600,500 C800,400 1000,600 1000,500 L1000,1000 L0,1000 Z"
          fill="url(#liquid-gradient)"
          animate={{
            d: [
              "M0,500 C200,400 400,600 600,500 C800,400 1000,600 1000,500 L1000,1000 L0,1000 Z",
              "M0,600 C200,500 400,700 600,600 C800,500 1000,700 1000,600 L1000,1000 L0,1000 Z",
              "M0,500 C200,400 400,600 600,500 C800,400 1000,600 1000,500 L1000,1000 L0,1000 Z",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M0,700 C300,600 700,800 1000,700 L1000,1000 L0,1000 Z"
          fill="url(#liquid-gradient)"
          animate={{
            d: [
              "M0,700 C300,600 700,800 1000,700 L1000,1000 L0,1000 Z",
              "M0,800 C300,700 700,900 1000,800 L1000,1000 L0,1000 Z",
              "M0,700 C300,600 700,800 1000,700 L1000,1000 L0,1000 Z",
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
}

// Main Component
export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Failed to load projects:", err));

    const darkMode =
      localStorage.getItem("darkMode") === "true" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const featuredProjects = projects.filter((p) => p.featured);
  const allProjects = projects;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
      {/* Liquid Background */}
      <LiquidBackground />

      {/* Main Layout with Fixed Sidebar */}
      <section id="home" className="min-h-screen relative">
        <div className="main-layout flex h-screen">
          {/* Left Side - Fixed Info Sidebar */}
          <div className="sidebar-fixed w-[500px] bg-white/5 dark:bg-black/5 backdrop-blur-xl border-r border-white/20 dark:border-white/10 p-8 overflow-y-auto">
            {/* Profile Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              {/* Profile Image */}
              <motion.div
                className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-purple-500/20 shadow-2xl"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(139, 92, 246, 0.3)",
                    "0 0 0 20px rgba(139, 92, 246, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* JS Placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                  JS
                </div>
              </motion.div>

              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                John Salama Beshay
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                Software Engineer
              </p>
              <p className="text-base text-gray-700 dark:text-gray-400">
                Full-Stack Developer (MERN Stack, React Native)
              </p>
            </motion.div>

            {/* About Section */}
            <motion.div
              id="about"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                About Me
              </h3>
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                Hey there! 👋 I'm a software engineer with experience in
                full-stack development (MERN Stack, React Native) seeking
                challenging opportunities to leverage my skills. Committed to
                delivering high-quality solutions and contributing to innovative
                projects. Passionate about continuous learning and growth in
                software engineering principles and technologies.
              </p>
            </motion.div>

            {/* Education Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Education
              </h3>
              <div className="bg-white/5 dark:bg-black/5 backdrop-blur-sm border border-white/10 dark:border-white/5 rounded-xl p-4">
                <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                  Computer Engineering (Bachelor's Degree)
                </h4>
                <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">
                  Helwan University
                </p>
                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                  <span>2018 - 2023</span>
                  <span className="bg-green-500/20 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                    Grade: Very Good 80%
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  Graduation Project Grade: Excellent
                </p>
              </div>
            </motion.div>

            {/* Experience Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-8"
            >
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Experience
              </h3>
              <div className="space-y-4">
                {/* Current Position */}
                <div className="bg-white/5 dark:bg-black/5 backdrop-blur-sm border border-white/10 dark:border-white/5 rounded-xl p-4">
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                    Software Developer
                  </h4>
                  <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">
                    Research and Development Center (Egyptian Air Defense
                    Military Commands)
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    May 2024 - Present · Full-time
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    Developing advanced missile systems simulators for military
                    training.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {[
                      "React.js",
                      "Electron.js",
                      "Node.js",
                      "GIS",
                      "C++",
                      "C#",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-green-500/20 text-green-700 dark:text-green-300 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Previous Position */}
                <div className="bg-white/5 dark:bg-black/5 backdrop-blur-sm border border-white/10 dark:border-white/5 rounded-xl p-4">
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                    Software Developer
                  </h4>
                  <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">
                    CTC (Helwan University)
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    07/2023 - 12/2023
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    Full Stack Web Developer (MERN) at Communication and
                    Technology Center - Helwan University, Developed Web
                    Application for The University
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {[
                      "JavaScript",
                      "React",
                      "Node.js",
                      "Express.js",
                      "MongoDB",
                      "Tailwind CSS",
                      "REST API",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-orange-500/20 text-orange-700 dark:text-orange-300 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-8"
            >
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Contact Methods
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    icon: Mail,
                    text: "Email",
                    color: "text-blue-500",
                    href: "mailto:john.salama.beshay@gmail.com",
                    label: "john.salama.beshay",
                  },
                  {
                    icon: Phone,
                    text: "Phone",
                    color: "text-green-500",
                    href: "tel:+201207252426",
                    label: "+201207252426",
                  },
                  {
                    icon: Github,
                    text: "GitHub",
                    color: "text-gray-600 dark:text-gray-400",
                    href: "https://github.com/John-Salama",
                    label: "John-Salama",
                  },
                  {
                    icon: ExternalLink,
                    text: "LinkedIn",
                    color: "text-blue-600",
                    href: "https://www.linkedin.com/in/john-salama-beshay/",
                    label: "john-salama-beshay",
                  },
                  {
                    icon: ExternalLink,
                    text: "Behance",
                    color: "text-purple-500",
                    href: "https://www.behance.net/johnsalama9",
                    label: "johnsalama9",
                  },
                  {
                    icon: MapPin,
                    text: "Location",
                    color: "text-red-500",
                    href: null,
                    label: "Cairo, Egypt",
                  },
                ].map((contact, index) => (
                  <motion.div
                    key={contact.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + index * 0.1 }}
                    className="bg-white/5 dark:bg-black/5 backdrop-blur-sm border border-white/10 dark:border-white/5 rounded-xl p-3 hover:bg-white/10 dark:hover:bg-black/10 transition-all duration-200"
                  >
                    {contact.href ? (
                      <a
                        href={contact.href}
                        target={
                          contact.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          contact.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="flex items-center space-x-3 w-full"
                      >
                        <contact.icon className={contact.color} size={18} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {contact.text}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                            {contact.label}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <contact.icon className={contact.color} size={18} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {contact.text}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {contact.label}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side - Projects */}
          <div className="projects-container flex-1 overflow-y-auto px-6 py-8">
            {/* Projects Section */}
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
                  My Projects
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mb-6"></div>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Explore my portfolio of innovative projects built with modern
                  technologies
                </p>
              </motion.div>

              {/* Project Cards Grid */}
              <div
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
                id="projects"
              >
                {allProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6 hover:scale-105 transition-all duration-300 group"
                  >
                    {/* Project Image */}
                    <div className="relative h-48 mb-4 rounded-2xl overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="400px"
                      />
                      {project.featured && (
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <Star size={12} />
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Project Content */}
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-500/20 text-blue-700 dark:text-blue-300 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Project Links */}
                    <div className="flex space-x-3">
                      {project.links.website && (
                        <motion.a
                          href={project.links.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink size={14} />
                          Live Demo
                        </motion.a>
                      )}
                      {project.links.github && (
                        <motion.a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/20 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:shadow-lg transition-all"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github size={14} />
                          Code
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
