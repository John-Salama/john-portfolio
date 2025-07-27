"use client";

import { memo, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "../../types/project";

interface ProjectGalleryProps {
  project: Project;
  projectImages: string[];
}

function ProjectGallery({ project, projectImages }: ProjectGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  }, [projectImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + projectImages.length) % projectImages.length
    );
  }, [projectImages.length]);

  const goToImage = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  const getImageDisplayClass = useMemo(() => {
    return (imagePath: string) => {
      const displayConfig = project.config?.displayConfig;
      const imageType = project.config?.imageConfig?.type;
      const mobileHandling = displayConfig?.mobileImageHandling || "contain";

      const isMobileImage =
        imagePath?.includes("/android/") ||
        imagePath?.includes("/mobile/") ||
        imagePath?.includes("/ios/");

      if (
        imageType === "multiDirectory" &&
        isMobileImage &&
        mobileHandling === "contain"
      ) {
        return "object-contain bg-gray-100 dark:bg-gray-800";
      }
      return "object-contain sm:object-cover bg-gray-100 dark:bg-gray-800 sm:bg-transparent";
    };
  }, [project.config]);

  const getPlatformLabel = (imagePath: string) => {
    const displayConfig = project.config?.displayConfig;
    if (!displayConfig?.showPlatformIndicators) return null;

    const platformLabels = displayConfig.platformLabels || {
      web: "🌐 Web Version",
      mobile: "📱 Mobile Version",
      android: "📱 Android Version",
      ios: "📱 iOS Version",
    };

    if (imagePath?.includes("/web/")) return platformLabels.web;
    if (imagePath?.includes("/android/")) return platformLabels.android;
    if (imagePath?.includes("/ios/")) return platformLabels.ios;
    if (imagePath?.includes("/mobile/")) return platformLabels.mobile;
    return null;
  };

  if (projectImages.length === 0) {
    return (
      <div className="mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 text-center">
          Project Gallery
        </h2>
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl mb-4 sm:mb-6 bg-gray-100 dark:bg-gray-800 aspect-video flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">
            No images available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 sm:mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 text-center">
        Project Gallery
      </h2>
      <div className="relative">
        {/* Main Image Display */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl mb-4 sm:mb-6">
          <div className="relative w-full aspect-video max-h-[70vh]">
            <Image
              src={projectImages[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              fill
              className={`transition-opacity duration-300 ${getImageDisplayClass(
                projectImages[currentImageIndex]
              )}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            {/* Navigation Arrows */}
            {projectImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 dark:hover:bg-black/30 transition-all hover:scale-110 touch-manipulation"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} className="sm:hidden" />
                  <ChevronLeft size={24} className="hidden sm:block" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 dark:hover:bg-black/30 transition-all hover:scale-110 touch-manipulation"
                  aria-label="Next image"
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

            {/* Platform indicator */}
            {getPlatformLabel(projectImages[currentImageIndex]) && (
              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-black/50 backdrop-blur-sm text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                {getPlatformLabel(projectImages[currentImageIndex])}
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        {projectImages.length > 1 && (
          <div className="pb-4 px-2 flex justify-start sm:justify-center">
            <div className="flex space-x-2 sm:space-x-3 overflow-x-auto max-w-full py-2 px-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {projectImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-300 touch-manipulation ${
                    index === currentImageIndex
                      ? "border-purple-500 shadow-lg scale-110"
                      : "border-white/30 dark:border-white/20 hover:border-purple-400 hover:scale-105"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className={getImageDisplayClass(image)}
                    sizes="(max-width: 640px) 64px, 80px"
                  />
                  {index === currentImageIndex && (
                    <div className="absolute inset-0 bg-purple-500/20" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ProjectGallery);
