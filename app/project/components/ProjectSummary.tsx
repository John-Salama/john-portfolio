"use client";

import { memo } from "react";
import { Project } from "../../types/project";

interface ProjectSummaryProps {
  project: Project;
}

function ProjectSummary({ project }: ProjectSummaryProps) {
  if (!project.summary && !project.testAccounts) {
    return null;
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Summary */}
        {project.summary && (
          <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Project Summary
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
              {project.summary}
            </p>
          </div>
        )}

        {/* Test Accounts */}
        {project.testAccounts && (
          <div className="bg-gradient-to-br from-emerald-50/50 to-blue-50/50 dark:from-emerald-900/20 dark:to-blue-900/20 backdrop-blur-xl border border-emerald-200/30 dark:border-emerald-800/30 rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                Test Accounts
              </h3>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {Object.entries(project.testAccounts).map(
                ([role, credentials]) => {
                  const [email, password] = credentials.split(" / ");
                  return (
                    <div
                      key={role}
                      className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/50 dark:border-gray-700/50"
                    >
                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-800 dark:text-gray-200 capitalize text-sm sm:text-base">
                          {role}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-1.5 sm:gap-2 text-xs sm:text-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                          <span className="text-gray-600 dark:text-gray-400 font-medium">
                            Email:
                          </span>
                          <div className="flex items-center gap-1">
                            <code className="bg-gray-100 dark:bg-gray-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-gray-800 dark:text-gray-200 font-mono text-xs break-all">
                              {email}
                            </code>
                            <button
                              onClick={() => copyToClipboard(email)}
                              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors touch-manipulation"
                              title="Copy email"
                              aria-label="Copy email"
                            >
                              <svg
                                className="w-3 h-3 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                          <span className="text-gray-600 dark:text-gray-400 font-medium">
                            Password:
                          </span>
                          <div className="flex items-center gap-1">
                            <code className="bg-gray-100 dark:bg-gray-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-gray-800 dark:text-gray-200 font-mono text-xs">
                              {password}
                            </code>
                            <button
                              onClick={() => copyToClipboard(password)}
                              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors touch-manipulation"
                              title="Copy password"
                              aria-label="Copy password"
                            >
                              <svg
                                className="w-3 h-3 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default memo(ProjectSummary);
