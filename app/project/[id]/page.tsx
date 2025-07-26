"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  ArrowLeft,
  Download,
  Code,
  Palette,
  Star,
  Calendar,
  Tag,
  ChevronLeft,
  ChevronRight,
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

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [projectImages, setProjectImages] = useState<string[]>([]);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data) => {
        const foundProject = data.find((p: Project) => p.id === params.id);
        setProject(foundProject || null);

        // Load all available images for the project
        if (foundProject) {
          const images: string[] = [];
          const basePath = foundProject.image.substring(
            0,
            foundProject.image.lastIndexOf("/") + 1
          );
          const extension = foundProject.image.substring(
            foundProject.image.lastIndexOf(".")
          );

          // Check for up to 20 images
          for (let i = 1; i <= 20; i++) {
            const imagePath = `${basePath}${i}${extension}`;
            images.push(imagePath);
          }
          setProjectImages(images);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load project:", err);
        setLoading(false);
      });
  }, [params.id]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + projectImages.length) % projectImages.length
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <motion.h1
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Project Not Found
          </motion.h1>
          <motion.p
            className="text-gray-600 dark:text-gray-400 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            The project you're looking for doesn't exist or has been moved.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-xl font-medium"
            >
              <motion.div
                className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full"
                whileHover={{ rotate: -180, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowLeft size={16} />
              </motion.div>
              Back to Portfolio
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-3 px-6 py-3 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/20 text-gray-700 dark:text-gray-300 rounded-full hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <motion.div
              className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300"
              whileHover={{ rotate: -180, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowLeft size={16} />
            </motion.div>
            <span className="font-medium">Back to Portfolio</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Project Header */}
          <div className="mb-12">
            <div className="flex items-start justify-between mb-6">
              <div>
                <motion.h1
                  className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {project.title}
                </motion.h1>
                {project.featured && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                  >
                    <Star size={16} />
                    Featured Project
                  </motion.div>
                )}
              </div>
            </div>

            <motion.p
              className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {project.description}
            </motion.p>
          </div>

          {/* Image Slider */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Project Gallery
            </h2>

            <div className="relative">
              {/* Main Image Display */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-6">
                <div className="relative h-[70vh] min-h-[600px]">
                  {projectImages.length > 0 && (
                    <Image
                      src={projectImages[currentImageIndex]}
                      alt={`${project.title} - Image ${currentImageIndex + 1}`}
                      fill
                      className="object-cover transition-opacity duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                      priority
                      onError={(e) => {
                        // Remove failed image from array and adjust index
                        const target = e.target as HTMLImageElement;
                        const failedSrc = target.src;
                        setProjectImages((prev) => {
                          const newImages = prev.filter(
                            (img) =>
                              !img.includes(failedSrc.split("/").pop() || "")
                          );
                          if (
                            currentImageIndex >= newImages.length &&
                            newImages.length > 0
                          ) {
                            setCurrentImageIndex(0);
                          }
                          return newImages;
                        });
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                  {/* Navigation Arrows */}
                  {projectImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 dark:hover:bg-black/30 transition-all hover:scale-110"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 dark:hover:bg-black/30 transition-all hover:scale-110"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                    {currentImageIndex + 1} / {projectImages.length}
                  </div>
                </div>
              </div>

              {/* Thumbnail Navigation */}
              {projectImages.length > 1 && (
                <div className="flex justify-center space-x-3 overflow-x-auto pb-4">
                  {projectImages.slice(0, 10).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        index === currentImageIndex
                          ? "border-purple-500 shadow-lg scale-110"
                          : "border-white/30 dark:border-white/20 hover:border-purple-400 hover:scale-105"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                        onError={(e) => {
                          const target = e.target as HTMLElement;
                          if (target.parentElement) {
                            target.parentElement.style.display = "none";
                          }
                        }}
                      />
                      {index === currentImageIndex && (
                        <div className="absolute inset-0 bg-purple-500/20" />
                      )}
                    </button>
                  ))}
                  {projectImages.length > 10 && (
                    <div className="flex items-center justify-center w-20 h-20 bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/30 dark:border-white/20 rounded-xl text-gray-600 dark:text-gray-400 text-sm font-medium">
                      +{projectImages.length - 10}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Technologies Used */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Tag className="mr-3 text-blue-500" size={28} />
                  Technologies Used
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.tech.map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                      className="bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl p-4 text-center hover:scale-105 transition-transform duration-300"
                    >
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        {tech}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Project Features */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Project Highlights
                </h2>
                <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-8">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          Modern Design
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          Clean, responsive, and user-friendly interface
                          designed with modern UI/UX principles.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          Performance Optimized
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          Built with performance in mind, featuring fast loading
                          times and smooth interactions.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          Scalable Architecture
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          Developed using best practices and scalable
                          architecture for future growth.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Project Links */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Project Links
                </h3>
                <div className="space-y-4">
                  {project.links.website && (
                    <a
                      href={project.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all hover:scale-105"
                    >
                      <ExternalLink size={20} />
                      <span className="font-medium">Live Demo</span>
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/20 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-white/30 dark:hover:bg-black/30 transition-all hover:scale-105"
                    >
                      <Github size={20} />
                      <span className="font-medium">
                        {project.links.github2
                          ? "Frontend Code"
                          : "Source Code"}
                      </span>
                    </a>
                  )}
                  {project.links.github2 && (
                    <a
                      href={project.links.github2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/20 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-white/30 dark:hover:bg-black/30 transition-all hover:scale-105"
                    >
                      <Github size={20} />
                      <span className="font-medium">
                        {project.links.github3 ? "Backend Code" : "Server Code"}
                      </span>
                    </a>
                  )}
                  {project.links.github3 && (
                    <a
                      href={project.links.github3}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/20 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-white/30 dark:hover:bg-black/30 transition-all hover:scale-105"
                    >
                      <Github size={20} />
                      <span className="font-medium">API Code</span>
                    </a>
                  )}
                  {project.links.npm && (
                    <a
                      href={project.links.npm}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-red-500/20 text-red-700 dark:text-red-300 border border-red-400/50 rounded-xl hover:bg-red-500/30 transition-all hover:scale-105"
                    >
                      <Code size={20} />
                      <span className="font-medium">NPM Package</span>
                    </a>
                  )}
                  {project.links.behance && (
                    <a
                      href={project.links.behance}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-400/50 rounded-xl hover:bg-blue-500/30 transition-all hover:scale-105"
                    >
                      <Palette size={20} />
                      <span className="font-medium">Design Case Study</span>
                    </a>
                  )}
                  {project.links.playstore && (
                    <a
                      href={project.links.playstore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-green-500/20 text-green-700 dark:text-green-300 border border-green-400/50 rounded-xl hover:bg-green-500/30 transition-all hover:scale-105"
                    >
                      <Download size={20} />
                      <span className="font-medium">Download App</span>
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Project Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Project Info
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Status
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {project.featured ? "Featured" : "Completed"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Type
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      Web Application
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Technologies
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {project.tech.length} Tech Stack
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
