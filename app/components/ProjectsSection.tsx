import { memo, useMemo } from "react";
import { Code } from "lucide-react";
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
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="flex flex-col items-center justify-center text-center bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl p-4">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {projectStats.total}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Projects
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-center bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl p-4">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {projectStats.featured}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Featured
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-center bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl p-4">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {projectStats.technologies}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Technologies
              </div>
            </div>
          </div>
        </div>

        {/* All Projects Section */}
        <div>
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Code className="mr-3 text-blue-500" size={24} />
            All Projects
          </h3>
          <div
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
            id="projects"
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProjectsSection);
