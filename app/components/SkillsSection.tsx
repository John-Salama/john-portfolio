import { memo } from "react";
import {
  Code2,
  Database,
  Smartphone,
  Server,
  Wrench,
  Palette,
} from "lucide-react";

const skillsData = [
  {
    category: "Frontend Development",
    icon: Code2,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/20",
    textColor: "text-blue-700 dark:text-blue-300",
    skills: [
      "Next.js",
      "React.js",
      "Redux",
      "TypeScript",
      "Tailwind CSS",
      "React Query",
      "Zustand",
    ],
  },
  {
    category: "Backend Development",
    icon: Server,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/20",
    textColor: "text-green-700 dark:text-green-300",
    skills: [
      "Node.js",
      "Express.js",
      "Flask",
      "REST API",
      "Socket.io",
      "JWT",
      "OAuth",
    ],
  },
  {
    category: "Database & Storage",
    icon: Database,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/20",
    textColor: "text-purple-700 dark:text-purple-300",
    skills: ["MongoDB", "MySQL", "PostgreSQL", "Redis", "Firebase"],
  },
  {
    category: "Mobile Development",
    icon: Smartphone,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/20",
    textColor: "text-orange-700 dark:text-orange-300",
    skills: ["React Native", "Expo", "Android", "iOS"],
  },
];

const SkillCategory = memo(
  ({ category }: { category: (typeof skillsData)[number] }) => {
    const Icon = category.icon;
    return (
      <div className="bg-white/5 dark:bg-black/5 backdrop-blur-sm border border-white/10 dark:border-white/5 rounded-xl p-4 hover:bg-white/10 dark:hover:bg-black/10 hover:border-white/20 dark:hover:border-white/10 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500 ease-out">
        <div className="flex items-center mb-3">
          <div
            className={`w-8 h-8 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mr-3 shadow-lg group-hover:shadow-xl transition-shadow duration-500`}
          >
            <Icon size={18} className="text-white" />
          </div>
          <h4 className="font-semibold text-base text-gray-900 dark:text-white">
            {category.category}
          </h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <span
              key={skill}
              className={`px-3 py-1.5 text-xs rounded-full font-medium ${category.bgColor} ${category.textColor} transition-all duration-400 ease-out hover:scale-105 hover:shadow-sm`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    );
  }
);

SkillCategory.displayName = "SkillCategory";

function SkillsSection() {
  return (
    <div className="mb-6 lg:mb-8">
      <h3 className="text-lg lg:text-xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
        Skills & Technologies
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skillsData.map((category) => (
          <SkillCategory key={category.category} category={category} />
        ))}
      </div>
    </div>
  );
}

export default memo(SkillsSection);
