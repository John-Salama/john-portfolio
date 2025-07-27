"use client";

import { memo, useMemo } from "react";
import { Code } from "lucide-react";
import VirtualizedProjects from "./VirtualizedProjects";

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

interface ProjectsSectionProps {
  projects: Project[];
}

function ProjectsSection({ projects }: ProjectsSectionProps) {
  const { featuredProjects, projectStats } = useMemo(() => {
    const featured = projects.filter((p) => p.featured);
    const stats = {
      total: projects.length,
      featured: featured.length,
      technologies: 10, // This could be calculated from actual project tech stacks
    };
    return { featuredProjects: featured, projectStats: stats };
  }, [projects]);

  return (
    <div className="projects-container py-8 lg:overflow-y-auto">
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
        </div>

        {/* All Projects Section */}
        <div>
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Code className="mr-3 text-blue-500" size={24} />
            Projects
          </h3>
          <VirtualizedProjects projects={projects} />
        </div>
      </div>
    </div>
  );
}

export default memo(ProjectsSection);
