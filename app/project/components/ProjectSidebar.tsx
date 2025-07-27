import { memo } from "react";
import { Tag } from "lucide-react";
import { Project } from "../../types/project";

interface ProjectSidebarProps {
  project: Project;
}

function ProjectSidebar({ project }: ProjectSidebarProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Technologies Used */}
      <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
          <Tag className="mr-2 sm:mr-3 text-blue-500 sm:hidden" size={20} />
          <Tag
            className="mr-2 sm:mr-3 text-blue-500 hidden sm:block"
            size={24}
          />
          <span>Technologies Used</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-3">
          {project.tech.map((tech) => (
            <div
              key={tech}
              className="bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center hover:scale-105 transition-transform duration-400 ease-out"
            >
              <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(ProjectSidebar);
