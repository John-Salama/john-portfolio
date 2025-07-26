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
  // Optional summary information
  summary?: string;
  // Optional test accounts
  testAccounts?: {
    [role: string]: string; // role -> credentials
  };
  // Optional configuration for advanced projects
  config?: {
    // Image loading configuration
    imageConfig?: {
      type: "standard" | "multiDirectory"; // Type of image loading
      directories?: string[]; // For multi-directory projects like Error20
      maxImages?: number; // Maximum images to check for
      consecutiveMisses?: number; // How many consecutive misses before stopping
      imageFormat?: "png" | "jpg" | "auto"; // Force specific format or auto-detect
    };
    // Display configuration
    displayConfig?: {
      mobileImageHandling?: "contain" | "cover"; // How to display mobile screenshots
      showPlatformIndicators?: boolean; // Show platform labels for multi-platform projects
      platformLabels?: {
        web?: string;
        mobile?: string;
        android?: string;
        ios?: string;
      };
    };
    // Gallery configuration
    galleryConfig?: {
      thumbnailCount?: number; // How many thumbnails to show at once
      autoplay?: boolean; // Enable autoplay
      autoplayInterval?: number; // Autoplay interval in ms
    };
  };
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

          // Get configuration with defaults
          const imageConfig = foundProject.config?.imageConfig || {};
          const maxImages = imageConfig.maxImages || 50;
          const consecutiveMisses = imageConfig.consecutiveMisses || 3;
          const imageType = imageConfig.type || "standard";

          // Dynamically check for images by testing their existence
          const checkImageExists = async (
            imagePath: string
          ): Promise<boolean> => {
            try {
              const response = await fetch(imagePath, { method: "HEAD" });
              return response.ok;
            } catch {
              return false;
            }
          };

          const loadImages = async () => {
            const validImages: string[] = [];

            if (imageType === "multiDirectory" && imageConfig.directories) {
              // Load images from multiple directories
              for (const directory of imageConfig.directories) {
                const directoryBasePath = `/data/${foundProject.id}/${directory}/`;
                let imageIndex = 1;
                let misses = 0;

                while (misses < consecutiveMisses && imageIndex <= maxImages) {
                  const imagePath = `${directoryBasePath}${imageIndex}${extension}`;
                  const exists = await checkImageExists(imagePath);

                  if (exists) {
                    validImages.push(imagePath);
                    misses = 0;
                  } else {
                    misses++;
                  }

                  imageIndex++;
                }
              }
            } else {
              // Standard single directory loading
              let imageIndex = 1;
              let misses = 0;

              while (misses < consecutiveMisses && imageIndex <= maxImages) {
                const imagePath = `${basePath}${imageIndex}${extension}`;
                const exists = await checkImageExists(imagePath);

                if (exists) {
                  validImages.push(imagePath);
                  misses = 0;
                } else {
                  misses++;
                }

                imageIndex++;
              }
            }

            setProjectImages(validImages);
          };

          loadImages();
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Project Not Found
          </motion.h1>
          <motion.p
            className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base"
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
              className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-xl font-medium text-sm sm:text-base"
            >
              <motion.div
                className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full"
                whileHover={{ rotate: -180, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowLeft size={14} className="sm:hidden" />
                <ArrowLeft size={16} className="hidden sm:block" />
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/20 text-gray-700 dark:text-gray-300 rounded-full hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <motion.div
              className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300"
              whileHover={{ rotate: -180, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowLeft size={14} className="sm:hidden" />
              <ArrowLeft size={16} className="hidden sm:block" />
            </motion.div>
            <span className="font-medium text-sm sm:text-base">
              Back to Portfolio
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Project Header */}
          <div className="mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 sm:mb-6 gap-4">
              <div>
                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent mb-3 sm:mb-4"
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
                    className="inline-flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg"
                  >
                    <Star size={14} className="sm:hidden" />
                    <Star size={16} className="hidden sm:block" />
                    <span>Featured Project</span>
                  </motion.div>
                )}
              </div>
            </div>

            <motion.p
              className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {project.description}
            </motion.p>
          </div>

          {/* Image Slider */}
          <motion.div
            className="mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 text-center">
              Project Gallery
            </h2>

            <div className="relative">
              {/* Main Image Display */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl mb-4 sm:mb-6">
                <div className="relative w-full aspect-video max-h-[70vh]">
                  {projectImages.length > 0 && (
                    <Image
                      src={projectImages[currentImageIndex]}
                      alt={`${project.title} - Image ${currentImageIndex + 1}`}
                      fill
                      className={`transition-opacity duration-300 ${(() => {
                        const displayConfig = project.config?.displayConfig;
                        const imageType = project.config?.imageConfig?.type;
                        const mobileHandling =
                          displayConfig?.mobileImageHandling || "contain";

                        // Check if current image is from mobile/android directory
                        const currentImagePath =
                          projectImages[currentImageIndex];
                        const isMobileImage =
                          currentImagePath?.includes("/android/") ||
                          currentImagePath?.includes("/mobile/") ||
                          currentImagePath?.includes("/ios/");

                        // Use object-contain for mobile screens or mobile images
                        if (
                          imageType === "multiDirectory" &&
                          isMobileImage &&
                          mobileHandling === "contain"
                        ) {
                          return "object-contain bg-gray-100 dark:bg-gray-800";
                        }
                        // Use object-contain on mobile devices for better viewing
                        return "object-contain sm:object-cover bg-gray-100 dark:bg-gray-800 sm:bg-transparent";
                      })()}`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                      priority
                      onError={(e) => {
                        // If image fails to load, try to reload or skip
                        console.warn(
                          `Failed to load image: ${projectImages[currentImageIndex]}`
                        );
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                  {/* Navigation Arrows */}
                  {projectImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 dark:hover:bg-black/30 transition-all hover:scale-110 touch-manipulation"
                      >
                        <ChevronLeft size={20} className="sm:hidden" />
                        <ChevronLeft size={24} className="hidden sm:block" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 dark:hover:bg-black/30 transition-all hover:scale-110 touch-manipulation"
                      >
                        <ChevronRight size={20} className="sm:hidden" />
                        <ChevronRight size={24} className="hidden sm:block" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-black/50 backdrop-blur-sm text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                    {currentImageIndex + 1} / {projectImages.length}
                  </div>

                  {/* Platform indicator for multi-platform projects */}
                  {project.config?.displayConfig?.showPlatformIndicators &&
                    projectImages.length > 0 && (
                      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-black/50 backdrop-blur-sm text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                        {(() => {
                          const currentImagePath =
                            projectImages[currentImageIndex];
                          const platformLabels = project.config?.displayConfig
                            ?.platformLabels || {
                            web: "🌐 Web Version",
                            mobile: "📱 Mobile Version",
                            android: "📱 Android Version",
                            ios: "📱 iOS Version",
                          };

                          if (currentImagePath?.includes("/web/"))
                            return platformLabels.web;
                          if (currentImagePath?.includes("/android/"))
                            return platformLabels.android;
                          if (currentImagePath?.includes("/ios/"))
                            return platformLabels.ios;
                          if (currentImagePath?.includes("/mobile/"))
                            return platformLabels.mobile;
                          return "";
                        })()}
                      </div>
                    )}
                </div>
              </div>

              {/* Thumbnail Navigation */}
              {projectImages.length > 1 && (
                <div className="pb-4 px-2 flex justify-start sm:justify-center">
                  <div className="flex space-x-2 sm:space-x-3 overflow-x-auto max-w-full py-2 px-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] whitespace-nowrap">
                    {(() => {
                      // Calculate visible thumbnail range based on current image
                      const galleryConfig = project.config?.galleryConfig;
                      const maxVisibleThumbnails =
                        galleryConfig?.thumbnailCount || 9; // Default to 9, will be responsive via CSS
                      let startIndex = 0;
                      let endIndex = Math.min(
                        maxVisibleThumbnails,
                        projectImages.length
                      );

                      // If current image is beyond visible range, adjust the window
                      if (currentImageIndex >= maxVisibleThumbnails) {
                        startIndex = Math.max(
                          0,
                          currentImageIndex -
                            Math.floor(maxVisibleThumbnails / 2)
                        );
                        endIndex = Math.min(
                          projectImages.length,
                          startIndex + maxVisibleThumbnails
                        );

                        // Adjust start if we're near the end
                        if (endIndex === projectImages.length) {
                          startIndex = Math.max(
                            0,
                            projectImages.length - maxVisibleThumbnails
                          );
                        }
                      }

                      const visibleImages = projectImages.slice(
                        startIndex,
                        endIndex
                      );
                      const remainingImages = projectImages.length - endIndex;

                      return (
                        <>
                          {visibleImages.map((image, index) => {
                            const actualIndex = startIndex + index;
                            const displayConfig = project.config?.displayConfig;
                            const imageType = project.config?.imageConfig?.type;
                            const showPlatformIndicators =
                              displayConfig?.showPlatformIndicators;

                            // Detect image type
                            const isWebImage = image.includes("/web/");
                            const isAndroidImage = image.includes("/android/");
                            const isMobileImage =
                              image.includes("/mobile/") ||
                              image.includes("/android/") ||
                              image.includes("/ios/");
                            const isIosImage = image.includes("/ios/");

                            return (
                              <button
                                key={actualIndex}
                                onClick={() => goToImage(actualIndex)}
                                className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-300 touch-manipulation ${
                                  actualIndex === currentImageIndex
                                    ? "border-purple-500 shadow-lg scale-110"
                                    : "border-white/30 dark:border-white/20 hover:border-purple-400 hover:scale-105"
                                }`}
                              >
                                <Image
                                  src={image}
                                  alt={`Thumbnail ${actualIndex + 1}`}
                                  fill
                                  className={`${
                                    imageType === "multiDirectory" &&
                                    isMobileImage &&
                                    (displayConfig?.mobileImageHandling ||
                                      "contain") === "contain"
                                      ? "object-contain bg-gray-100 dark:bg-gray-800"
                                      : "object-cover"
                                  }`}
                                  sizes="(max-width: 640px) 64px, 80px"
                                  onError={(e) => {
                                    // Hide thumbnail if it fails to load
                                    const target = e.target as HTMLElement;
                                    if (target.parentElement) {
                                      target.parentElement.style.display =
                                        "none";
                                    }
                                  }}
                                />
                                {actualIndex === currentImageIndex && (
                                  <div className="absolute inset-0 bg-purple-500/20" />
                                )}
                                {/* Platform indicator for thumbnails */}
                                {showPlatformIndicators &&
                                  imageType === "multiDirectory" && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs px-1 py-0.5 text-center font-medium hidden sm:block">
                                      {(() => {
                                        const labels =
                                          displayConfig?.platformLabels;
                                        if (isWebImage)
                                          return (
                                            labels?.web?.split(" ")[1] || "Web"
                                          );
                                        if (isAndroidImage)
                                          return (
                                            labels?.android?.split(" ")[1] ||
                                            "App"
                                          );
                                        if (isIosImage)
                                          return (
                                            labels?.ios?.split(" ")[1] || "iOS"
                                          );
                                        if (isMobileImage)
                                          return (
                                            labels?.mobile?.split(" ")[1] ||
                                            "Mobile"
                                          );
                                        return "";
                                      })()}
                                    </div>
                                  )}
                              </button>
                            );
                          })}
                          {remainingImages > 0 && (
                            <button
                              onClick={() => goToImage(endIndex)}
                              className="flex-shrink-0 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 dark:bg-black/20 backdrop-blur-sm border-2 border-white/30 dark:border-white/20 rounded-lg sm:rounded-xl text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-bold hover:bg-white/30 dark:hover:bg-black/30 transition-all hover:scale-105 touch-manipulation shadow-md"
                            >
                              +{remainingImages}
                            </button>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 sm:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8 sm:space-y-12">
              {/* Project Links */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                  Project Links
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {project.links.website && (
                    <a
                      href={project.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all hover:scale-105 touch-manipulation"
                    >
                      <ExternalLink size={18} className="sm:hidden" />
                      <ExternalLink size={20} className="hidden sm:block" />
                      <span className="font-medium text-sm sm:text-base">
                        Live Demo
                      </span>
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/20 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-white/30 dark:hover:bg-black/30 transition-all hover:scale-105 touch-manipulation"
                    >
                      <Github size={18} className="sm:hidden" />
                      <Github size={20} className="hidden sm:block" />
                      <span className="font-medium text-sm sm:text-base">
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
                      className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/20 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-white/30 dark:hover:bg-black/30 transition-all hover:scale-105 touch-manipulation"
                    >
                      <Github size={18} className="sm:hidden" />
                      <Github size={20} className="hidden sm:block" />
                      <span className="font-medium text-sm sm:text-base">
                        {project.links.github3 ? "Backend Code" : "Server Code"}
                      </span>
                    </a>
                  )}
                  {project.links.github3 && (
                    <a
                      href={project.links.github3}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/20 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-white/30 dark:hover:bg-black/30 transition-all hover:scale-105 touch-manipulation"
                    >
                      <Github size={18} className="sm:hidden" />
                      <Github size={20} className="hidden sm:block" />
                      <span className="font-medium text-sm sm:text-base">
                        API Code
                      </span>
                    </a>
                  )}
                  {project.links.npm && (
                    <a
                      href={project.links.npm}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-red-500/20 text-red-700 dark:text-red-300 border border-red-400/50 rounded-xl hover:bg-red-500/30 transition-all hover:scale-105 touch-manipulation"
                    >
                      <Code size={18} className="sm:hidden" />
                      <Code size={20} className="hidden sm:block" />
                      <span className="font-medium text-sm sm:text-base">
                        NPM Package
                      </span>
                    </a>
                  )}
                  {project.links.behance && (
                    <a
                      href={project.links.behance}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-400/50 rounded-xl hover:bg-blue-500/30 transition-all hover:scale-105 touch-manipulation"
                    >
                      <Palette size={18} className="sm:hidden" />
                      <Palette size={20} className="hidden sm:block" />
                      <span className="font-medium text-sm sm:text-base">
                        Design Case Study
                      </span>
                    </a>
                  )}
                  {project.links.playstore && (
                    <a
                      href={project.links.playstore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-green-500/20 text-green-700 dark:text-green-300 border border-green-400/50 rounded-xl hover:bg-green-500/30 transition-all hover:scale-105 touch-manipulation"
                    >
                      <Download size={18} className="sm:hidden" />
                      <Download size={20} className="hidden sm:block" />
                      <span className="font-medium text-sm sm:text-base">
                        Download App
                      </span>
                    </a>
                  )}
                </div>
              </motion.section>

              {/* Project Summary Section */}
              {(project.summary || project.testAccounts) && (
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {/* Summary */}
                    {project.summary && (
                      <motion.div
                        className="bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                      >
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                          Project Summary
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                          {project.summary}
                        </p>
                      </motion.div>
                    )}

                    {/* Test Accounts */}
                    {project.testAccounts && (
                      <motion.div
                        className="bg-gradient-to-br from-emerald-50/50 to-blue-50/50 dark:from-emerald-900/20 dark:to-blue-900/20 backdrop-blur-xl border border-emerald-200/30 dark:border-emerald-800/30 rounded-xl sm:rounded-2xl p-4 sm:p-6"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                      >
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z"
                              />
                            </svg>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                            Test Accounts
                          </h3>
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                          {Object.entries(project.testAccounts).map(
                            ([role, credentials], index) => {
                              const [email, password] =
                                credentials.split(" / ");
                              return (
                                <motion.div
                                  key={role}
                                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/50 dark:border-gray-700/50"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    delay: 1.0 + index * 0.1,
                                  }}
                                >
                                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                      <svg
                                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                      </svg>
                                    </div>
                                    <span className="font-semibold text-gray-800 dark:text-gray-200 capitalize text-sm sm:text-base">
                                      {role}
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-1 gap-1.5 sm:gap-2 text-xs sm:text-sm">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                                      <span className="text-gray-600 dark:text-gray-400 font-medium">
                                        Email:
                                      </span>
                                      <div className="flex items-center gap-1">
                                        <code className="bg-gray-100 dark:bg-gray-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-gray-800 dark:text-gray-200 font-mono text-xs break-all">
                                          {email}
                                        </code>
                                        <button
                                          onClick={() =>
                                            navigator.clipboard.writeText(email)
                                          }
                                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors touch-manipulation"
                                          title="Copy email"
                                        >
                                          <svg
                                            className="w-3 h-3 text-gray-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                            />
                                          </svg>
                                        </button>
                                      </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                                      <span className="text-gray-600 dark:text-gray-400 font-medium">
                                        Password:
                                      </span>
                                      <div className="flex items-center gap-1">
                                        <code className="bg-gray-100 dark:bg-gray-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-gray-800 dark:text-gray-200 font-mono text-xs">
                                          {password}
                                        </code>
                                        <button
                                          onClick={() =>
                                            navigator.clipboard.writeText(
                                              password
                                            )
                                          }
                                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors touch-manipulation"
                                          title="Copy password"
                                        >
                                          <svg
                                            className="w-3 h-3 text-gray-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                            />
                                          </svg>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            }
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6 sm:space-y-8">
              {/* Technologies Used */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
                  <Tag
                    className="mr-2 sm:mr-3 text-blue-500 sm:hidden"
                    size={20}
                  />
                  <Tag
                    className="mr-2 sm:mr-3 text-blue-500 hidden sm:block"
                    size={24}
                  />
                  <span>Technologies Used</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-3">
                  {project.tech.map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                      className="bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center hover:scale-105 transition-transform duration-300"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                        {tech}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
