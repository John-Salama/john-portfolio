import { notFound } from "next/navigation";
import {
  getProject,
  getProjectImages,
  getAllProjectIds,
} from "../../lib/projectData";
import ProjectHeader from "../components/ProjectHeader";
import ProjectGallery from "../components/ProjectGallery";
import ProjectLinks from "../components/ProjectLinks";
import ProjectSummary from "../components/ProjectSummary";
import ProjectSidebar from "../components/ProjectSidebar";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

// Generate static params for all projects (ISR)
export async function generateStaticParams() {
  const projectIds = await getAllProjectIds();
  return projectIds.map((id) => ({
    id: id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - John Salama Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;

  // Fetch project data server-side
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  // Fetch project images server-side
  const projectImages = await getProjectImages(project);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <ProjectHeader project={project} />

        <ProjectGallery project={project} projectImages={projectImages} />

        <div className="grid lg:grid-cols-3 gap-8 sm:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8 sm:space-y-12">
            <ProjectLinks project={project} />
            <ProjectSummary project={project} />
          </div>

          {/* Sidebar */}
          <ProjectSidebar project={project} />
        </div>
      </div>
    </div>
  );
}
