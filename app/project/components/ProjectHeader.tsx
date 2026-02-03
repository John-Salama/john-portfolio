import { memo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Project } from "../../types/project";

interface ProjectHeaderProps {
  project: Project;
}

function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <>
      {/* Back Button */}
      <div className="mb-6 sm:mb-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-400 ease-out hover:scale-105 hover:shadow-lg shadow-sm"
        >
          <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-400 ease-out group-hover:rotate-180 group-hover:scale-110">
            <ArrowRight size={14} className="sm:hidden" />
            <ArrowRight size={16} className="hidden sm:block" />
          </div>
          <span className="font-medium text-sm sm:text-base">
            Back to Portfolio
          </span>
        </Link>
      </div>

      {/* Project Header */}
      <div className="mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 sm:mb-6 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent mb-3 sm:mb-4">
              {project.title}
            </h1>
            {project.featured && (
              <div className="inline-flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                <Star size={14} className="sm:hidden" />
                <Star size={16} className="hidden sm:block" />
                <span>Featured Project</span>
              </div>
            )}
          </div>
        </div>

        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl">
          {project.description}
        </p>
      </div>
    </>
  );
}

export default memo(ProjectHeader);
