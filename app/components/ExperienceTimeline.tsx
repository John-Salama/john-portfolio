import { memo } from "react";

const experienceData = [
  {
    title: "Software Developer",
    company:
      "Research and Development Center (Egyptian Air Defense Military Commands)",
    period: "May 2024 - Present",
    type: "Full-time",
    description:
      "Developing advanced missile systems simulators for military training.",
    technologies: ["React.js", "Electron.js", "Node.js", "GIS", "C++", "C#"],
    isCurrent: true,
    dotColor: "from-green-500 to-emerald-500",
  },
  {
    title: "Software Developer",
    company: "CTC (Helwan University)",
    period: "07/2023 - 12/2023",
    type: "6 months",
    description:
      "Full Stack Web Developer (MERN) at Communication and Technology Center - Helwan University, Developed Web Application for The University",
    technologies: [
      "JavaScript",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "REST API",
    ],
    isCurrent: false,
    dotColor: "from-orange-500 to-red-500",
  },
];

function ExperienceTimeline() {
  return (
    <div className="mb-6 lg:mb-8">
      <h3 className="text-lg lg:text-xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
        Experience Timeline
      </h3>
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500"></div>

        {experienceData.map((experience, index) => (
          <div
            key={index}
            className={`relative flex items-start ${
              index < experienceData.length - 1 ? "mb-8" : ""
            }`}
          >
            {/* Timeline Dot */}
            <div
              className={`relative z-10 w-8 h-8 bg-gradient-to-r ${experience.dotColor} rounded-full flex items-center justify-center mr-4 shadow-lg`}
            >
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>

            {/* Content */}
            <div className="flex-1 bg-white/5 dark:bg-black/5 backdrop-blur-sm border border-white/10 dark:border-white/5 rounded-xl p-4 ml-2">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                  {experience.title}
                </h4>
                {experience.isCurrent && (
                  <span className="px-3 py-1 bg-green-500/20 text-green-700 dark:text-green-300 text-xs rounded-full font-medium">
                    Current
                  </span>
                )}
              </div>
              <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">
                {experience.company}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {experience.period} · {experience.type}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                {experience.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={`px-2 py-1 text-xs rounded-full ${
                      experience.isCurrent
                        ? "bg-green-500/20 text-green-700 dark:text-green-300"
                        : "bg-orange-500/20 text-orange-700 dark:text-orange-300"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(ExperienceTimeline);
