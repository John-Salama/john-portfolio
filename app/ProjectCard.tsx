"use client";

import { memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Github,
  ExternalLink,
  Star,
  Code,
  Palette,
  Download,
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

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/project/${project.id}`);
  }, [router, project.id]);

  return (
    <div
      key={project.id}
      className={`group relative ${
        project.featured
          ? "featured-project featured-glow holographic bg-gradient-to-br from-purple-500/20 via-blue-500/15 to-emerald-500/10 border-2 border-transparent shadow-2xl"
          : "bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10"
      } backdrop-blur-xl rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-500 cursor-pointer overflow-hidden hover:scale-105`}
      onClick={handleClick}
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
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 6} // Prioritize first 6 images
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Kic6LzlpFXtbqBXAq8aMAdDSAAwKLJ7fFnEWLXZMI2L/AFLFBhVhC4TQrBFIjY/U4DnZ+Ue4jtGhz+nJ3/8Aed+g=="
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
              onClick={(e) => e.stopPropagation()}
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
              onClick={(e) => e.stopPropagation()}
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
              onClick={(e) => e.stopPropagation()}
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
              onClick={(e) => e.stopPropagation()}
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
              onClick={(e) => e.stopPropagation()}
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
              onClick={(e) => e.stopPropagation()}
            >
              <Download size={12} />
              App
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(ProjectCard);
