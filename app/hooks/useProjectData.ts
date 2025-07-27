import { useMemo } from "react";

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

interface ProjectStats {
  total: number;
  featured: number;
  technologies: number;
}

export function useProjectData(projects: Project[]) {
  return useMemo(() => {
    const featuredProjects = projects.filter((p) => p.featured);

    // Calculate unique technologies
    const uniqueTech = new Set<string>();
    projects.forEach((project) => {
      project.tech.forEach((tech) => uniqueTech.add(tech));
    });

    const stats: ProjectStats = {
      total: projects.length,
      featured: featuredProjects.length,
      technologies: uniqueTech.size,
    };

    return {
      allProjects: projects,
      featuredProjects,
      stats,
      uniqueTechnologies: Array.from(uniqueTech),
    };
  }, [projects]);
}
