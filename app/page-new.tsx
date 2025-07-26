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

// Floating Navigation
function FloatingNav({ scrollToSection, toggleDarkMode, isDarkMode }: any) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-full px-6 py-3 shadow-2xl">
        <div className="flex items-center space-x-6">
          <motion.div
            className="font-bold text-lg bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            JS
          </motion.div>

          <div className="hidden md:flex items-center space-x-4">
            {["about", "projects", "contact"].map((section) => (
              <motion.button
                key={section}
                onClick={() => scrollToSection(section)}
                className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200 capitalize"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section}
              </motion.button>
            ))}
          </div>

          <motion.button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 transition-all duration-200"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDarkMode ? "☀️" : "🌙"}
          </motion.button>

          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/20 dark:bg-white/10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pt-4 border-t border-white/20 dark:border-white/10"
            >
              {["about", "projects", "contact"].map((section) => (
                <motion.button
                  key={section}
                  onClick={() => {
                    scrollToSection(section);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200 capitalize"
                  whileHover={{ x: 5 }}
                >
                  {section}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

// Bento Grid Hero Section
function BentoHero() {
  return (
    <section id="home" className="min-h-screen pt-20 pb-10 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 grid-rows-6 gap-4 h-[80vh] max-h-[800px]">
          {/* Main Title Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="col-span-12 md:col-span-8 row-span-3 bg-gradient-to-br from-purple-600/10 to-blue-600/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden"
          >
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full opacity-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                John Salama
              </span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-2xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Software Engineer crafting innovative solutions with passion
            </motion.p>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-12 md:col-span-4 row-span-3 bg-gradient-to-br from-pink-500/10 to-purple-600/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden"
          >
            <motion.div
              className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(139, 92, 246, 0.3)",
                  "0 0 0 20px rgba(139, 92, 246, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              JS
            </motion.div>
            <motion.div
              className="mt-4 text-center"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="font-semibold text-lg">Full-Stack Developer</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                MERN Stack
              </p>
            </motion.div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="col-span-6 md:col-span-3 row-span-2 bg-gradient-to-br from-green-500/10 to-emerald-600/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center"
          >
            <Code className="text-3xl text-green-500 mb-2" />
            <h3 className="text-2xl font-bold">10+</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Projects</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="col-span-6 md:col-span-3 row-span-2 bg-gradient-to-br from-orange-500/10 to-red-600/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center"
          >
            <Rocket className="text-3xl text-orange-500 mb-2" />
            <h3 className="text-2xl font-bold">2+</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Years Exp.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="col-span-6 md:col-span-3 row-span-2 bg-gradient-to-br from-blue-500/10 to-cyan-600/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center"
          >
            <Heart className="text-3xl text-blue-500 mb-2" />
            <h3 className="text-2xl font-bold">100%</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Passion</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="col-span-6 md:col-span-3 row-span-2 bg-gradient-to-br from-violet-500/10 to-purple-600/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center"
          >
            <Coffee className="text-3xl text-violet-500 mb-2" />
            <h3 className="text-2xl font-bold">∞</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Coffee</p>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="col-span-12 md:col-span-6 row-span-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-6 flex items-center justify-between text-white relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-blue-600/50"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative z-10">
              <h3 className="font-semibold text-lg">Ready to work together?</h3>
              <p className="text-sm opacity-90">
                Let's create something amazing!
              </p>
            </div>
            <motion.button
              className="relative z-10 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full font-medium flex items-center gap-2"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Hexagonal Project Grid
function HexagonalProject({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative ${isEven ? "mt-0" : "mt-12"}`}
    >
      <div className="relative w-72 h-72 mx-auto">
        {/* Hexagon Container */}
        <motion.div
          className="w-full h-full relative"
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 relative overflow-hidden">
            {/* Background Image */}
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover opacity-30"
              sizes="300px"
            />

            {/* Content Overlay */}
            <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center">
              {project.featured && (
                <motion.div
                  className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Star size={10} />
                </motion.div>
              )}

              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {project.title}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-4 justify-center">
                {project.tech.slice(0, 2).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex space-x-3">
                {project.links.website && (
                  <motion.a
                    href={project.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-blue-600 dark:text-blue-400"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink size={16} />
                  </motion.a>
                )}
                {project.links.github && (
                  <motion.a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-gray-700 dark:text-gray-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github size={16} />
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
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

      {/* Floating Navigation */}
      <FloatingNav
        scrollToSection={scrollToSection}
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
      />

      {/* Bento Grid Hero */}
      <BentoHero />

      {/* About Section with Diagonal Layout */}
      <section id="about" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-8">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Hey there! 👋 I'm a passionate software engineer with
                  expertise in full-stack development, specializing in the MERN
                  Stack and React Native. I love creating innovative solutions
                  and delivering high-quality applications that make a
                  difference.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  With a Bachelor's degree in Computer Engineering from Helwan
                  University (Grade: Very Good 80%), I'm committed to continuous
                  learning and growth in software engineering principles and
                  technologies.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Skills & Technologies
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "JavaScript",
                    "React",
                    "Node.js",
                    "Express.js",
                    "MongoDB",
                    "React Native",
                    "TypeScript",
                    "Python",
                    "Tailwind CSS",
                    "Git",
                    "REST APIs",
                    "Next.js",
                  ].map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-xl p-3 text-center font-medium"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: Mail,
                    text: "john.salama.beshay@gmail.com",
                    color: "text-blue-500",
                  },
                  {
                    icon: Phone,
                    text: "+201207252426",
                    color: "text-green-500",
                  },
                  { icon: MapPin, text: "Cairo, Egypt", color: "text-red-500" },
                ].map((contact, index) => (
                  <motion.div
                    key={contact.text}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3 bg-white/5 dark:bg-black/5 backdrop-blur-sm border border-white/10 dark:border-white/5 rounded-2xl p-4"
                  >
                    <contact.icon className={contact.color} size={20} />
                    <span className="text-gray-700 dark:text-gray-300">
                      {contact.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hexagonal Projects Section */}
      <section id="projects" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              My Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore my portfolio of innovative projects built with modern
              technologies
            </p>
          </motion.div>

          {/* Hexagonal Grid */}
          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
            {allProjects.slice(0, 6).map((project, index) => (
              <HexagonalProject
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Let's Connect
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-8"></div>

            <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-12 mb-12">
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Ready to bring your ideas to life? Let's collaborate and create
                something amazing together!
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.a
                  href="mailto:john.salama.beshay@gmail.com"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-medium flex items-center gap-3 justify-center"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail size={20} />
                  Send Email
                </motion.a>
                <motion.a
                  href="https://github.com/John-Salama"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/20 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-full font-medium flex items-center gap-3 justify-center"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={20} />
                  View GitHub
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black/5 dark:bg-black/20 backdrop-blur-xl border-t border-white/10 dark:border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex justify-center space-x-6">
              {[
                { href: "https://github.com/John-Salama", icon: Github },
                { href: "mailto:john.salama.beshay@gmail.com", icon: Mail },
                {
                  href: "https://www.behance.net/johnsalama9",
                  icon: ExternalLink,
                },
              ].map((social, index) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-full text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              © 2025 John Salama Beshay. Crafted with ❤️ and lots of ☕
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
