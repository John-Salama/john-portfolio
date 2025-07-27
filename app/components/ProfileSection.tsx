import { memo } from "react";
import Image from "next/image";
import { Mail, Phone, Github, ExternalLink, MapPin } from "lucide-react";
import ExperienceTimeline from "./ExperienceTimeline";

const contactMethods = [
  {
    icon: Mail,
    text: "Email",
    color: "text-blue-500",
    href: "mailto:john.salama.beshay@gmail.com",
    label: "john.salama.beshay",
  },
  {
    icon: Phone,
    text: "Phone",
    color: "text-green-500",
    href: "tel:+201207252426",
    label: "+201207252426",
  },
  {
    icon: Github,
    text: "GitHub",
    color: "text-gray-600 dark:text-gray-400",
    href: "https://github.com/John-Salama",
    label: "John-Salama",
  },
  {
    icon: ExternalLink,
    text: "LinkedIn",
    color: "text-blue-600",
    href: "https://www.linkedin.com/in/john-salama-beshay/",
    label: "john-salama-beshay",
  },
  {
    icon: ExternalLink,
    text: "Behance",
    color: "text-purple-500",
    href: "https://www.behance.net/johnsalama9",
    label: "johnsalama9",
  },
  {
    icon: MapPin,
    text: "Location",
    color: "text-red-500",
    href: null,
    label: "Cairo, Egypt",
  },
] as const;

const ContactItem = memo(
  ({ contact }: { contact: (typeof contactMethods)[number] }) => (
    <div className="bg-white/5 dark:bg-black/5 backdrop-blur-sm border border-white/10 dark:border-white/5 rounded-xl p-3 hover:bg-white/10 dark:hover:bg-black/10 transition-all duration-200">
      {contact.href ? (
        <a
          href={contact.href}
          target={contact.href.startsWith("http") ? "_blank" : undefined}
          rel={
            contact.href.startsWith("http") ? "noopener noreferrer" : undefined
          }
          className="flex items-center space-x-3 w-full"
        >
          <contact.icon className={contact.color} size={18} />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {contact.text}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              {contact.label}
            </p>
          </div>
        </a>
      ) : (
        <div className="flex items-center space-x-3">
          <contact.icon className={contact.color} size={18} />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {contact.text}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {contact.label}
            </p>
          </div>
        </div>
      )}
    </div>
  )
);

ContactItem.displayName = "ContactItem";

function ProfileSection() {
  return (
    <div className="sidebar-responsive bg-white/5 dark:bg-black/5 backdrop-blur-xl lg:border-r border-white/20 dark:border-white/10 p-6 lg:p-8 lg:overflow-y-auto">
      {/* Profile Section */}
      <div className="text-center mb-8">
        <div className="w-32 h-32 lg:w-40 lg:h-40 mx-auto mb-4 lg:mb-6 rounded-full overflow-hidden border-4 border-purple-500/20 shadow-2xl relative">
          <Image
            src="/data/my.jpg"
            alt="John Salama Beshay"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 128px, 160px"
            priority
          />
        </div>

        <h1 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          John Salama Beshay
        </h1>
        <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-2">
          Software Engineer
        </p>
        <p className="text-sm lg:text-base text-gray-700 dark:text-gray-400">
          Full-Stack Developer (MERN Stack, React Native)
        </p>
      </div>

      {/* About Section */}
      <section id="about" className="mb-6 lg:mb-8">
        <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          About Me
        </h3>
        <p className="text-sm lg:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Hey there! 👋 I'm a software engineer with experience in full-stack
          development (MERN Stack, React Native) seeking challenging
          opportunities to leverage my skills. Committed to delivering
          high-quality solutions and contributing to innovative projects.
          Passionate about continuous learning and growth in software
          engineering principles and technologies.
        </p>
      </section>

      {/* Education Section */}
      <section className="mb-6 lg:mb-8">
        <h3 className="text-lg lg:text-xl font-bold mb-3 lg:mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Education
        </h3>
        <div className="bg-white/5 dark:bg-black/5 backdrop-blur-sm border border-white/10 dark:border-white/5 rounded-xl p-4">
          <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
            Computer Engineering (Bachelor's Degree)
          </h4>
          <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">
            Helwan University
          </p>
          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <span>2018 - 2023</span>
            <span className="bg-green-500/20 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
              Grade: Very Good 80%
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Graduation Project Grade: Excellent
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="mb-6 lg:mb-8">
        <h3 className="text-lg lg:text-xl font-bold mb-3 lg:mb-4 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
          Contact Methods
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
          {contactMethods.map((contact) => (
            <ContactItem key={contact.text} contact={contact} />
          ))}
        </div>
      </section>

      {/* Experience Timeline */}
      <ExperienceTimeline />
    </div>
  );
}

export default memo(ProfileSection);
