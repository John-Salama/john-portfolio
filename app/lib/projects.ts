import path from "path";
import { promises as fs } from "fs";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  links: {
    website?: string;
    github?: string;
    github2?: string;
    github3?: string;
    npm?: string;
    behance?: string;
    playstore?: string;
  };
  image: string;
  featured: boolean;
}

export async function getProjects(): Promise<Project[]> {
  try {
    const jsonDirectory = path.join(process.cwd(), "public", "data");
    const fileContents = await fs.readFile(
      jsonDirectory + "/projects.json",
      "utf8"
    );
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Failed to load projects:", error);
    return [];
  }
}
