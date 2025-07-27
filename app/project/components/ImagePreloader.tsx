'use client';

import { useEffect, useState } from 'react';

interface ImagePreloaderProps {
  images: string[];
  onProgress?: (loaded: number, total: number) => void;
  onComplete?: () => void;
}

export function ImagePreloader({ images, onProgress, onComplete }: ImagePreloaderProps) {
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    let mounted = true;
    let completed = 0;

    const loadImage = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          if (mounted) {
            completed++;
            setLoadedCount(completed);
            onProgress?.(completed, images.length);
          }
          resolve();
        };
        img.onerror = () => {
          if (mounted) {
            completed++;
            setLoadedCount(completed);
            onProgress?.(completed, images.length);
          }
          resolve();
        };
        img.src = src;
      });
    };

    const preloadImages = async () => {
      // Load images in batches to avoid overwhelming the browser
      const batchSize = 3;
      for (let i = 0; i < images.length; i += batchSize) {
        const batch = images.slice(i, i + batchSize);
        await Promise.all(batch.map(loadImage));
        // Small delay between batches
        if (i + batchSize < images.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      
      if (mounted) {
        onComplete?.();
      }
    };

    preloadImages();

    return () => {
      mounted = false;
    };
  }, [images, onProgress, onComplete]);

  return null; // This component doesn't render anything
}

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export function ProgressBar({ progress, className = '' }: ProgressBarProps) {
  const progressPercentage = Math.min(100, Math.max(0, progress));
  const widthClass = `w-[${progressPercentage}%]`;
  
  return (
    <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 ${className}`}>
      <div 
        className={`bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out ${widthClass}`}
      />
    </div>
  );
}
