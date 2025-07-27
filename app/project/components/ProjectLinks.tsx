import { memo } from "react";
import { Github, ExternalLink, Download, Code, Palette } from "lucide-react";
import { Project } from "../../types/project";

interface ProjectLinksProps {
  project: Project;
}

function ProjectLinks({ project }: ProjectLinksProps) {
  const links = [
    {
      key: "website",
      url: project.links.website,
      label: "Live Demo",
      icon: ExternalLink,
      className:
        "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700",
    },
    {
      key: "github",
      url: project.links.github,
      label: project.links.github2 ? "Frontend Code" : "Source Code",
      icon: Github,
      className:
        "bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/20 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-black/30",
    },
    {
      key: "github2",
      url: project.links.github2,
      label: project.links.github3 ? "Backend Code" : "Server Code",
      icon: Github,
      className:
        "bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/20 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-black/30",
    },
    {
      key: "github3",
      url: project.links.github3,
      label: "API Code",
      icon: Github,
      className:
        "bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/20 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-black/30",
    },
    {
      key: "npm",
      url: project.links.npm,
      label: "NPM Package",
      icon: Code,
      className:
        "bg-red-500/20 text-red-700 dark:text-red-300 border border-red-400/50 hover:bg-red-500/30",
    },
    {
      key: "behance",
      url: project.links.behance,
      label: "Design Case Study",
      icon: Palette,
      className:
        "bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-400/50 hover:bg-blue-500/30",
    },
    {
      key: "playstore",
      url: project.links.playstore,
      label: "Download App",
      icon: Download,
      className:
        "bg-green-500/20 text-green-700 dark:text-green-300 border border-green-400/50 hover:bg-green-500/30",
    },
  ];

  const availableLinks = links.filter((link) => link.url);

  if (availableLinks.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
        Project Links
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {availableLinks.map(({ key, url, label, icon: Icon, className }) => (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl transition-all hover:scale-105 touch-manipulation ${className}`}
          >
            <Icon size={18} className="sm:hidden" />
            <Icon size={20} className="hidden sm:block" />
            <span className="font-medium text-sm sm:text-base">{label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default memo(ProjectLinks);
