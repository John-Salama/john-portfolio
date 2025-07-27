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
  const [preloadedImages, setPreloadedImages] = useState<Set<number>>(
    new Set()
  );
  const [imageLoading, setImageLoading] = useState<Set<number>>(new Set());
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Preload images for faster swapping
  useEffect(() => {
    const preloadImage = (index: number) => {
      if (preloadedImages.has(index)) return;

      const img = new window.Image();
      img.onload = () => {
        setPreloadedImages((prev) => new Set([...prev, index]));
      };
      img.src = projectImages[index];
    };

    // Always preload current image and adjacent ones
    const indicesToPreload = [
      currentImageIndex,
      (currentImageIndex + 1) % projectImages.length,
      (currentImageIndex - 1 + projectImages.length) % projectImages.length,
    ];

    indicesToPreload.forEach(preloadImage);
  }, [currentImageIndex, projectImages, preloadedImages]);

  // Preload all images in the background after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      projectImages.forEach((src, index) => {
        if (!preloadedImages.has(index)) {
          // Create link tags for faster browser caching
          const link = document.createElement("link");
          link.rel = "prefetch";
          link.href = src;
          document.head.appendChild(link);

          // Also use Image constructor as fallback
          const img = new window.Image();
          img.src = src;
        }
      });
    }, 500); // Start after 500ms for faster initial experience

    return () => clearTimeout(timer);
  }, [projectImages, preloadedImages]);

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

  // Image loading handlers
  const handleImageLoadStart = useCallback((index: number) => {
    setImageLoading((prev) => new Set([...prev, index]));
  }, []);

  const handleImageLoadComplete = useCallback((index: number) => {
    setImageLoading((prev) => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  }, []);

  // Touch handlers for swipe navigation
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && projectImages.length > 1) {
      nextImage();
    }
    if (isRightSwipe && projectImages.length > 1) {
      prevImage();
    }
  };

  // Auto-scroll thumbnails to keep active thumbnail visible
  useEffect(() => {
    if (thumbnailsRef.current) {
      const container = thumbnailsRef.current;
      const activeButton = container.children[currentImageIndex] as HTMLElement;

      if (activeButton) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();

        // Check if button is outside the visible area
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
      }
    }
  }, [currentImageIndex]);

  // Keyboard navigation
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

    window.addEventListener("keydown", handleKeyDown);
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

      // Special handling for different image types
      if (
        imageType === "multiDirectory" &&
        isMobileImage &&
        mobileHandling === "contain"
      ) {
        return "object-contain bg-gray-100 dark:bg-gray-800";
      }

      // For web images, use cover on larger screens, contain on mobile for better fit
      if (isWebImage) {
        return "object-contain lg:object-cover bg-gray-100 dark:bg-gray-800 lg:bg-transparent";
      }

      // Default: contain on mobile/tablet, cover on desktop for optimal viewing
      return "object-contain xl:object-cover bg-gray-100 dark:bg-gray-800 xl:bg-transparent";
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

  // Loading Spinner Component
  const LoadingSpinner = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-300 dark:border-gray-600 border-t-purple-500 rounded-full animate-spin"></div>
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
          Loading...
        </div>
      </div>
    </div>
  );

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
            {imageLoading.has(currentImageIndex) && <LoadingSpinner />}

            <Image
              src={projectImages[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              fill
              className={`transition-opacity duration-150 ${getImageDisplayClass(
                projectImages[currentImageIndex]
              )} ${
                imageLoading.has(currentImageIndex)
                  ? "opacity-0"
                  : "opacity-100"
              }`}
              priority={currentImageIndex <= 2} // Higher priority for first few images
              quality={95} // Higher quality for better user experience
              loading={currentImageIndex <= 2 ? undefined : "lazy"} // Don't set loading when priority is true
              onLoad={() => handleImageLoadComplete(currentImageIndex)}
              onLoadStart={() => handleImageLoadStart(currentImageIndex)}
              onError={(e) => {
                console.error(
                  `Failed to load image: ${projectImages[currentImageIndex]}`
                );
                handleImageLoadComplete(currentImageIndex);
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            />

            {/* Invisible preload images for next/prev */}
            {projectImages.length > 1 && (
              <>
                <Image
                  src={
                    projectImages[
                      (currentImageIndex + 1) % projectImages.length
                    ]
                  }
                  alt=""
                  fill
                  className="opacity-0 pointer-events-none"
                  priority={false}
                  quality={95}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                />
                <Image
                  src={
                    projectImages[
                      (currentImageIndex - 1 + projectImages.length) %
                        projectImages.length
                    ]
                  }
                  alt=""
                  fill
                  className="opacity-0 pointer-events-none"
                  priority={false}
                  quality={95}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                />
              </>
            )}

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
                  {imageLoading.has(index) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10">
                      <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 border-t-purple-500 rounded-full animate-spin"></div>
                    </div>
                  )}

                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className={`${getImageDisplayClass(image)} ${
                      imageLoading.has(index) ? "opacity-0" : "opacity-100"
                    } transition-opacity duration-150`}
                    sizes="(max-width: 640px) 64px, 80px"
                    priority={index <= 5} // Prioritize first 6 thumbnails
                    quality={80} // Lower quality for thumbnails to load faster
                    loading={index <= 5 ? undefined : "lazy"} // Don't set loading when priority is true
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
