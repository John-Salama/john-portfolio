import ProfileSection from "./components/ProfileSection";
import ProjectsSection from "./components/ProjectsSection";
import StaticBackground from "./components/StaticBackground";
import { getProjects } from "./lib/projects";
import { Analytics } from "@vercel/analytics/next";

// Main Component (now server component)
export default async function Home() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
      <Analytics />

      {/* Static Background */}
      <StaticBackground />

      {/* Main Layout with Grid Design */}
      <section id="home" className="min-h-screen relative">
        <div className="main-layout grid grid-cols-1 lg:grid-cols-[500px_1fr] lg:h-screen max-w-none mx-0">
          {/* Left Side - Profile Info Section */}
          <ProfileSection />

          {/* Right Side - Projects */}
          <ProjectsSection projects={projects} />
        </div>
      </section>
    </div>
  );
}
