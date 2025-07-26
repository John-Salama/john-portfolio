"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
    github2?: string;
    github3?: string;
    npm?: string;
    behance?: string;
    playstore?: string;
  };
  image: string;
  featured: boolean;
}

// Static Background Component
function StaticBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/20 via-blue-50/10 to-emerald-50/20 dark:from-purple-900/10 dark:via-blue-900/5 dark:to-emerald-900/10"></div>
    </div>
  );
}

// Main Component
export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setProjects(data))
      .catch((err) => {
        console.error("Failed to load projects:", err);
        // Fallback to empty array if fetch fails
        setProjects([]);
      });

    const darkMode =
      localStorage.getItem("darkMode") === "true" ||
      (!localStorage.getItem("darkMode") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const featuredProjects = projects.filter((p) => p.featured);
  const allProjects = projects;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
      {/* Static Background */}
      <StaticBackground />

      {/* Main Layout with Grid Design */}
      <section id="home" className="min-h-screen relative">
        <div className="main-layout grid grid-cols-1 lg:grid-cols-[500px_1fr] lg:h-screen max-w-none mx-0">
          {/* Left Side - Profile Info Section */}
          <div className="sidebar-responsive bg-white/5 dark:bg-black/5 backdrop-blur-xl lg:border-r border-white/20 dark:border-white/10 p-6 lg:p-8 lg:overflow-y-auto">
            {/* Profile Section */}
            <div className="text-center mb-8">
              {/* Profile Image */}
              <div className="w-32 h-32 lg:w-40 lg:h-40 mx-auto mb-4 lg:mb-6 rounded-full overflow-hidden border-4 border-purple-500/20 shadow-2xl relative">
                <Image
                  src="/data/my.jpg"
                  alt="John Salama Beshay"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 128px, 160px"
                  priority
                />
              </div>

              <h1 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                John Salama Beshay
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-2">
                Software Engineer
              </p>
              <p className="text-sm lg:text-base text-gray-700 dark:text-gray-400">
                Full-Stack Developer (MERN Stack, React Native)
              </p>
            </div>

            {/* About Section */}
            <div id="about" className="mb-6 lg:mb-8">
              <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                About Me
              </h3>
              <p className="text-sm lg:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                Hey there! 👋 I'm a software engineer with experience in
                full-stack development (MERN Stack, React Native) seeking
                challenging opportunities to leverage my skills. Committed to
                delivering high-quality solutions and contributing to innovative
                projects. Passionate about continuous learning and growth in
                software engineering principles and technologies.
              </p>
            </div>

            {/* Education Section */}
            <div className="mb-6 lg:mb-8">
              <h3 className="text-lg lg:text-xl font-bold mb-3 lg:mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
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
            </div>

            {/* Experience Timeline */}
            <div className="mb-6 lg:mb-8">
              <h3 className="text-lg lg:text-xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Experience Timeline
              </h3>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500"></div>

                {/* Current Position */}
                <div className="relative flex items-start mb-8">
                  {/* Timeline Dot */}
                  <div className="relative z-10 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white/5 dark:bg-black/5 backdrop-blur-sm border border-white/10 dark:border-white/5 rounded-xl p-4 ml-2">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                        Software Developer
                      </h4>
                      <span className="px-3 py-1 bg-green-500/20 text-green-700 dark:text-green-300 text-xs rounded-full font-medium">
                        Current
                      </span>
                    </div>
                    <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">
                      Research and Development Center (Egyptian Air Defense
                      Military Commands)
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      May 2024 - Present · Full-time
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      Developing advanced missile systems simulators for
                      military training.
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
                </div>

                {/* Previous Position */}
                <div className="relative flex items-start">
                  {/* Timeline Dot */}
                  <div className="relative z-10 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white/5 dark:bg-black/5 backdrop-blur-sm border border-white/10 dark:border-white/5 rounded-xl p-4 ml-2">
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                      Software Developer
                    </h4>
                    <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">
                      CTC (Helwan University)
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      07/2023 - 12/2023 · 6 months
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
              </div>
            </div>

            {/* Contact Methods */}
            <div className="mb-6 lg:mb-8">
              <h3 className="text-lg lg:text-xl font-bold mb-3 lg:mb-4 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Contact Methods
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 ">
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
                  <div
                    key={contact.text}
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
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Projects */}
          <div className="projects-container py-8 lg:overflow-y-auto">
            {/* Projects Section */}
            <div className="w-full h-full px-2 sm:px-4 lg:px-6">
              <div className="mb-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                    My Projects
                  </h2>
                  <div className="w-32 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-6"></div>
                  <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Explore my portfolio of innovative projects built with
                    cutting-edge technologies
                  </p>
                </div>

                {/* Project Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="flex flex-col items-center justify-center text-center bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl p-4">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {allProjects.length}+
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total Projects
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl p-4">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {featuredProjects.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Featured
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl p-4">
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      10+
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Technologies
                    </div>
                  </div>
                </div>
              </div>

              {/* All Projects Section */}
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Code className="mr-3 text-blue-500" size={24} />
                  All Projects
                </h3>
                <div
                  className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                  id="projects"
                >
                  {allProjects.map((project, index) => (
                    <div
                      key={project.id}
                      className={`group relative ${
                        project.featured
                          ? "featured-project featured-glow holographic bg-gradient-to-br from-purple-500/20 via-blue-500/15 to-emerald-500/10 border-2 border-transparent shadow-2xl"
                          : "bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10"
                      } backdrop-blur-xl rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-500 cursor-pointer overflow-hidden hover:scale-105`}
                      onClick={() => router.push(`/project/${project.id}`)}
                    >
                      {/* Project Image */}
                      <div
                        className={`relative ${
                          project.featured ? "h-44" : "h-40"
                        } mb-4 rounded-xl overflow-hidden ${
                          project.featured ? "shadow-xl" : ""
                        }`}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="350px"
                        />
                        {project.featured && (
                          <>
                            <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                              <Star size={12} />
                              Featured
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-yellow-400/10"></div>
                          </>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Project Content */}
                      <div className="relative z-10">
                        <h4
                          className={`${
                            project.featured ? "text-xl" : "text-lg"
                          } font-bold mb-2 ${
                            project.featured
                              ? "bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent group-hover:from-yellow-500 group-hover:via-orange-500 group-hover:to-red-500"
                              : "text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400"
                          } transition-all duration-500`}
                        >
                          {project.title}
                        </h4>
                        <p
                          className={`text-gray-700 dark:text-gray-300 mb-4 text-sm ${
                            project.featured ? "line-clamp-3" : "line-clamp-2"
                          }`}
                        >
                          {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.tech.map((tech, techIndex) => (
                            <span
                              key={tech}
                              className={`px-2 py-1 text-xs rounded-full ${
                                project.featured
                                  ? "bg-gradient-to-r from-purple-500/30 to-blue-500/30 text-purple-700 dark:text-purple-300 border border-purple-500/40 shadow-sm"
                                  : "bg-blue-500/20 text-blue-700 dark:text-blue-300"
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Project Links */}
                        <div className="flex flex-wrap gap-2">
                          {project.links.website && (
                            <a
                              href={project.links.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center gap-1 px-3 py-2 text-xs font-medium rounded-lg transition-all hover:scale-105 active:scale-95 ${
                                project.featured
                                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-blue-700"
                                  : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg"
                              }`}
                            >
                              <ExternalLink size={12} />
                              Demo
                            </a>
                          )}
                          {project.links.github && (
                            <a
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center gap-1 px-3 py-2 text-xs font-medium rounded-lg transition-all hover:scale-105 active:scale-95 ${
                                project.featured
                                  ? "bg-white/30 dark:bg-black/30 backdrop-blur-sm border-2 border-purple-400/50 text-gray-700 dark:text-gray-300 hover:border-purple-500 hover:shadow-lg"
                                  : "bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/20 text-gray-700 dark:text-gray-300 hover:shadow-lg"
                              }`}
                            >
                              <Github size={12} />
                              {project.links.github2 ? "Frontend" : "Code"}
                            </a>
                          )}
                          {project.links.github2 && (
                            <a
                              href={project.links.github2}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center gap-1 px-2 py-2 text-xs font-medium rounded-lg transition-all hover:scale-105 active:scale-95 ${
                                project.featured
                                  ? "bg-white/30 dark:bg-black/30 backdrop-blur-sm border border-purple-400/50 text-gray-700 dark:text-gray-300 hover:border-purple-500"
                                  : "bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/20 text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              <Github size={12} />
                              {project.links.github3 ? "API" : "Server"}
                            </a>
                          )}
                          {project.links.npm && (
                            <a
                              href={project.links.npm}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center gap-1 px-2 py-2 text-xs font-medium rounded-lg transition-all hover:scale-105 active:scale-95 ${
                                project.featured
                                  ? "bg-red-500/30 text-red-700 dark:text-red-300 border border-red-400/50 hover:bg-red-500/40"
                                  : "bg-red-500/20 text-red-700 dark:text-red-300"
                              }`}
                            >
                              <Code size={12} />
                              NPM
                            </a>
                          )}
                          {project.links.behance && (
                            <a
                              href={project.links.behance}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center gap-1 px-2 py-2 text-xs font-medium rounded-lg transition-all hover:scale-105 active:scale-95 ${
                                project.featured
                                  ? "bg-blue-500/30 text-blue-700 dark:text-blue-300 border border-blue-400/50 hover:bg-blue-500/40"
                                  : "bg-blue-500/20 text-blue-700 dark:text-blue-300"
                              }`}
                            >
                              <Palette size={12} />
                              Design
                            </a>
                          )}
                          {project.links.playstore && (
                            <a
                              href={project.links.playstore}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center gap-1 px-2 py-2 text-xs font-medium rounded-lg transition-all hover:scale-105 active:scale-95 ${
                                project.featured
                                  ? "bg-green-500/30 text-green-700 dark:text-green-300 border border-green-400/50 hover:bg-green-500/40"
                                  : "bg-green-500/20 text-green-700 dark:text-green-300"
                              }`}
                            >
                              <Download size={12} />
                              App
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
