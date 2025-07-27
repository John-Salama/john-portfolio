"use client";

import { memo, useState, useMemo, useCallback } from "react";
import { Code, Filter, Search } from "lucide-react";
import ProjectCard from "../ProjectCard";

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

interface VirtualizedProjectsProps {
  projects: Project[];
}

function VirtualizedProjects({ projects }: VirtualizedProjectsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState<string>("");

  // Memoize filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTech = !selectedTech || project.tech.includes(selectedTech);
      return matchesSearch && matchesTech;
    });
  }, [projects, searchTerm, selectedTech]);

  // Memoize all technologies
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(project => {
      project.tech.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [projects]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleTechFilter = useCallback((tech: string) => {
    setSelectedTech(selectedTech === tech ? "" : tech);
  }, [selectedTech]);

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTech("")}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              !selectedTech 
                ? "bg-purple-600 text-white" 
                : "bg-white/10 dark:bg-black/10 text-gray-700 dark:text-gray-300 hover:bg-purple-600/20"
            }`}
          >
            All
          </button>
          {allTechnologies.slice(0, 8).map((tech) => (
            <button
              key={tech}
              onClick={() => handleTechFilter(tech)}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                selectedTech === tech
                  ? "bg-purple-600 text-white"
                  : "bg-white/10 dark:bg-black/10 text-gray-700 dark:text-gray-300 hover:bg-purple-600/20"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl p-8 max-w-md mx-auto">
            <Code className="mx-auto mb-4 text-gray-400" size={48} />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(VirtualizedProjects);
