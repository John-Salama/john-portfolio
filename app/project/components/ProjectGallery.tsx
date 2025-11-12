"use client";

import { memo, useState, useCallback, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "../../types/project";

interface ProjectGalleryProps {
  project: Project;
  projectImages: string[];
}

function ProjectGallery({ project, projectImages }: ProjectGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState<Record<number, boolean>>({});
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number | null>(null);
  const touchEndRef = useRef<number | null>(null);

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

  // Optimized image loading handlers
  const handleImageLoadStart = useCallback((index: number) => {
    setImageLoading((prev) => ({ ...prev, [index]: true }));
  }, []);

  const handleImageLoadComplete = useCallback((index: number) => {
    setImageLoading((prev) => {
      const newState = { ...prev };
      delete newState[index];
      return newState;
    });
  }, []);

  // Touch handlers for swipe navigation
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchEndRef.current = null;
    touchStartRef.current = e.targetTouches[0].clientX;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStartRef.current || !touchEndRef.current) return;

    const distance = touchStartRef.current - touchEndRef.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && projectImages.length > 1) {
      nextImage();
    }
    if (isRightSwipe && projectImages.length > 1) {
      prevImage();
    }
  }, [nextImage, prevImage, projectImages.length]);

  // Auto-scroll thumbnails to keep active thumbnail visible
  useEffect(() => {
    if (thumbnailsRef.current) {
      const container = thumbnailsRef.current;
      const activeButton = container.children[currentImageIndex] as HTMLElement;

      if (activeButton) {
        // Use requestAnimationFrame to avoid layout thrashing
        requestAnimationFrame(() => {
          const containerRect = container.getBoundingClientRect();
          const buttonRect = activeButton.getBoundingClientRect();

          if (
            buttonRect.left < containerRect.left ||
            buttonRect.right > containerRect.right
          ) {
            activeButton.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "center",
            });
          }
        });
      }
    }
  }, [currentImageIndex]);

  // Preload adjacent images for smoother navigation
  useEffect(() => {
    if (projectImages.length <= 1) return;

    const preloadAdjacentImages = () => {
      const nextIndex = (currentImageIndex + 1) % projectImages.length;
      const prevIndex =
        (currentImageIndex - 1 + projectImages.length) % projectImages.length;

      // Use link preload for next/prev images only
      [nextIndex, prevIndex].forEach((index) => {
        const existingLink = document.querySelector(
          `link[rel="preload"][href*="${projectImages[index]}"]`
        );
        if (!existingLink) {
          const link = document.createElement("link");
          link.rel = "preload";
          link.as = "image";
          link.href = projectImages[index];
          document.head.appendChild(link);
        }
      });
    };

    // Delay preloading to not block main content
    const timer = setTimeout(preloadAdjacentImages, 100);
    return () => clearTimeout(timer);
  }, [currentImageIndex, projectImages]);

  // Keyboard navigation with cleanup
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        prevImage();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        nextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextImage, prevImage]);

  const getImageDisplayClass = useMemo(() => {
    return (imagePath: string) => {
      const displayConfig = project.config?.displayConfig;
      const imageType = project.config?.imageConfig?.type;
      const mobileHandling = displayConfig?.mobileImageHandling || "contain";

      const isMobileImage =
        imagePath?.includes("/android/") ||
        imagePath?.includes("/mobile/") ||
        imagePath?.includes("/ios/");

      const isWebImage = imagePath?.includes("/web/");

      if (
        imageType === "multiDirectory" &&
        isMobileImage &&
        mobileHandling === "contain"
      ) {
        return "object-contain bg-gray-100 dark:bg-gray-800";
      }

      if (isWebImage) {
        return "object-contain lg:object-cover bg-gray-100 dark:bg-gray-800 lg:bg-transparent";
      }

      return "object-contain xl:object-cover bg-gray-100 dark:bg-gray-800 xl:bg-transparent";
    };
  }, [project.config]);

  const getPlatformLabel = useCallback(
    (imagePath: string) => {
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
    },
    [project.config]
  );

  // Loading Spinner Component
  const LoadingSpinner = memo(() => (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-300 dark:border-gray-600 border-t-purple-500 rounded-full animate-spin"></div>
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
          Loading...
        </div>
      </div>
    </div>
  ));
  LoadingSpinner.displayName = "LoadingSpinner";

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
        <div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl mb-4 sm:mb-6"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative w-full aspect-[4/3] sm:aspect-video max-h-[60vh] sm:max-h-[70vh]">
            {/* Loading Spinner */}
            {imageLoading[currentImageIndex] && <LoadingSpinner />}

            <Image
              src={projectImages[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              fill
              className={`transition-opacity duration-300 ease-out ${getImageDisplayClass(
                projectImages[currentImageIndex]
              )} ${
                imageLoading[currentImageIndex] ? "opacity-0" : "opacity-100"
              }`}
              priority={currentImageIndex === 0}
              fetchPriority={currentImageIndex === 0 ? "high" : "auto"} // LCP optimization
              quality={85} // Further reduced for better performance
              loading={currentImageIndex === 0 ? "eager" : "lazy"}
              onLoad={() => handleImageLoadComplete(currentImageIndex)}
              onLoadStart={() => handleImageLoadStart(currentImageIndex)}
              onError={() => {
                console.error(
                  `Failed to load image: ${projectImages[currentImageIndex]}`
                );
                handleImageLoadComplete(currentImageIndex);
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            {/* Navigation Arrows */}
            {projectImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 dark:hover:bg-black/30 hover:shadow-lg transition-all duration-500 ease-out hover:scale-110 touch-manipulation"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} className="sm:hidden" />
                  <ChevronLeft size={24} className="hidden sm:block" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 dark:hover:bg-black/30 hover:shadow-lg transition-all duration-500 ease-out hover:scale-110 touch-manipulation"
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
            <div
              ref={thumbnailsRef}
              className="flex space-x-2 sm:space-x-3 overflow-x-auto max-w-full py-2 px-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
            >
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
                  {/* Thumbnail Loading Spinner */}
                  {imageLoading[index] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10">
                      <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 border-t-purple-500 rounded-full animate-spin"></div>
                    </div>
                  )}

                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className={`${getImageDisplayClass(image)} ${
                      imageLoading[index] ? "opacity-0" : "opacity-100"
                    } transition-opacity duration-150`}
                    sizes="(max-width: 640px) 64px, 80px"
                    priority={false} // No priority for thumbnails
                    quality={70} // Lower quality for faster loading
                    loading="lazy" // Always lazy load thumbnails
                    onLoad={() => handleImageLoadComplete(index)}
                    onLoadStart={() => handleImageLoadStart(index)}
                    onError={() => handleImageLoadComplete(index)}
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
