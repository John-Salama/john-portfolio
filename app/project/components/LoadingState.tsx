import { memo } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface LoadingStateProps {
  type: "loading" | "not-found";
}

function LoadingState({ type }: LoadingStateProps) {
  if (type === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Project Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
          The project you're looking for doesn't exist or has been moved.
        </p>
        <div>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-xl font-medium text-sm sm:text-base"
          >
            <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full group-hover:rotate-180 group-hover:scale-110 transition-all duration-300">
              <ArrowLeft size={14} className="sm:hidden" />
              <ArrowLeft size={16} className="hidden sm:block" />
            </div>
            Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default memo(LoadingState);
