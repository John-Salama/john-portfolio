"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  Menu,
  X,
  MapPin,
  Phone,
  ChevronRight,
  Star,
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

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load projects data
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Failed to load projects:", err));

    // Check for dark mode preference
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
    setIsMenuOpen(false);
  };

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-bold text-xl font-poppins gradient-text"
            >
              John Salama
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("about")}
                className="nav-link"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="nav-link"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="nav-link"
              >
                Contact
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-600 dark:text-gray-300"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => scrollToSection("about")}
                  className="mobile-nav-link"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="mobile-nav-link"
                >
                  Projects
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="mobile-nav-link"
                >
                  Contact
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold font-poppins mb-6">
                Hi, I'm <span className="gradient-text">John Salama</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Software Engineer crafting innovative solutions with{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  MERN Stack
                </span>{" "}
                &{" "}
                <span className="font-semibold text-purple-600 dark:text-purple-400">
                  React Native
                </span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => scrollToSection("projects")}
                  className="btn-primary text-white px-8 py-3 rounded-full font-medium flex items-center gap-2"
                >
                  View My Work <ChevronRight size={20} />
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-full font-medium hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                >
                  Get In Touch
                </button>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center space-x-6 mb-12"
            >
              <Link
                href="https://github.com/John-Salama"
                className="social-link"
              >
                <Github size={24} />
              </Link>
              <Link
                href="mailto:john.salama.beshay@gmail.com"
                className="social-link"
              >
                <Mail size={24} />
              </Link>
              <Link
                href="https://www.behance.net/johnsalama9"
                className="social-link"
              >
                <ExternalLink size={24} />
              </Link>
            </motion.div>

            {/* Floating Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="animate-float"
            >
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-white text-4xl font-bold">JS</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6 gradient-text">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Hey there! 👋 I'm a passionate software engineer with expertise
                in full-stack development, specializing in the MERN Stack and
                React Native. I love creating innovative solutions and
                delivering high-quality applications that make a difference.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                With a Bachelor's degree in Computer Engineering from Helwan
                University (Grade: Very Good 80%), I'm committed to continuous
                learning and growth in software engineering principles and
                technologies.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="text-blue-500" size={20} />
                  <span className="text-gray-700 dark:text-gray-300">
                    john.salama.beshay@gmail.com
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-green-500" size={20} />
                  <span className="text-gray-700 dark:text-gray-300">
                    +201207252426
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-red-500" size={20} />
                  <span className="text-gray-700 dark:text-gray-300">
                    Cairo, Egypt
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold font-poppins mb-4">
                Technical Skills
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
                  "Tailwind CSS",
                  "Python",
                  "Flask",
                  "REST APIs",
                  "Git",
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <h4 className="text-xl font-semibold font-poppins mb-4">
                  Experience
                </h4>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <h5 className="font-semibold text-lg mb-2">
                    Full Stack Web Developer
                  </h5>
                  <p className="text-blue-600 dark:text-blue-400 mb-2">
                    Communication and Technology Center - Helwan University
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                    07/2023 - 12/2023
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Developed web applications for the university using MERN
                    stack, focusing on creating efficient and user-friendly
                    solutions for educational purposes.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6 gradient-text">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Here are some of my most impactful projects that showcase my
              skills and passion for development.
            </p>
          </motion.div>

          {/* Featured Projects */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                featured
              />
            ))}
          </div>

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h3 className="text-3xl font-bold font-poppins mb-4">
                  Other Projects
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Additional projects that demonstrate my diverse skill set.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {otherProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6 gradient-text">
              Let's Work Together
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              I'm always interested in new opportunities and exciting projects.
              Let's discuss how we can bring your ideas to life!
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link
                href="mailto:john.salama.beshay@gmail.com"
                className="btn-primary text-white px-8 py-4 rounded-full font-medium flex items-center gap-3 text-lg"
              >
                <Mail size={24} />
                Send Email
              </Link>
              <Link
                href="https://github.com/John-Salama"
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-full font-medium hover:border-blue-500 dark:hover:border-blue-400 transition-colors flex items-center gap-3 text-lg"
              >
                <Github size={24} />
                View GitHub
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <Mail className="text-blue-500 mx-auto mb-4" size={32} />
                <h3 className="font-semibold text-lg mb-2">Email</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  john.salama.beshay@gmail.com
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <Phone className="text-green-500 mx-auto mb-4" size={32} />
                <h3 className="font-semibold text-lg mb-2">Phone</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  +201207252426
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <MapPin className="text-red-500 mx-auto mb-4" size={32} />
                <h3 className="font-semibold text-lg mb-2">Location</h3>
                <p className="text-gray-600 dark:text-gray-300">Cairo, Egypt</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-8">
            <Link
              href="https://github.com/John-Salama"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github size={24} />
            </Link>
            <Link
              href="mailto:john.salama.beshay@gmail.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Mail size={24} />
            </Link>
            <Link
              href="https://www.behance.net/johnsalama9"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ExternalLink size={24} />
            </Link>
          </div>
          <p className="text-gray-400">
            © 2025 John Salama Beshay. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Project Card Component
function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden card-hover ${
        featured ? "lg:col-span-1" : ""
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {featured && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Star size={12} />
            Featured
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold font-poppins mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        <div className="flex space-x-3">
          {project.links.website && (
            <Link
              href={project.links.website}
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <ExternalLink size={16} />
              Live
            </Link>
          )}
          {project.links.github && (
            <Link
              href={project.links.github}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <Github size={16} />
              Code
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
