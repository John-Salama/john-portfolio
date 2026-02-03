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
      <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl border border-gray-200 dark:border-gray-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-500 ease-out hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg hover:-translate-y-1 shadow-lg dark:shadow-none">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center transition-colors duration-300 ease-out">
          <Tag
            className="mr-2 sm:mr-3 text-blue-500 sm:hidden transition-all duration-400 ease-out hover:text-blue-400 hover:scale-110"
            size={20}
          />
          <Tag
            className="mr-2 sm:mr-3 text-blue-500 hidden sm:block transition-all duration-400 ease-out hover:text-blue-400 hover:scale-110"
            size={24}
          />
          <span>Technologies Used</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-3">
          {project.tech.map((tech) => (
            <div
              key={tech}
              className="bg-gray-50 dark:bg-gray-700/50 backdrop-blur-xl border border-gray-200 dark:border-gray-600/50 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center hover:scale-105 transition-all duration-500 ease-out hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-md hover:-translate-y-0.5 shadow-sm"
            >
              <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white transition-colors duration-500 ease-out">
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
