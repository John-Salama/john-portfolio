import path from "path";
import { promises as fs } from "fs";
import { Project } from "../types/project";

export async function getProject(id: string): Promise<Project | null> {
  try {
    const jsonDirectory = path.join(process.cwd(), "public", "data");
    const fileContents = await fs.readFile(
      jsonDirectory + "/projects.json",
      "utf8"
    );
    const projects = JSON.parse(fileContents);
    return projects.find((project: Project) => project.id === id) || null;
  } catch (error) {
    console.error("Error loading project:", error);
    return null;
  }
}

export async function getProjectImages(project: Project): Promise<string[]> {
  try {
    const projectImagesDir = path.join(
      process.cwd(),
      "public",
      "data",
      project.id
    );

    // Check if directory exists
    try {
      await fs.access(projectImagesDir);
    } catch {
      return [];
    }

    const files = await fs.readdir(projectImagesDir);

    // Filter image files and sort them
    const imageExtensions = [".png", ".jpg", ".jpeg", ".gif", ".webp"];
    const imageFiles = files
      .filter((file) =>
        imageExtensions.some((ext) => file.toLowerCase().endsWith(ext))
      )
      .sort((a, b) => {
        // Extract numbers from filenames for proper sorting
        const aNum = parseInt(a.match(/\d+/)?.[0] || "0");
        const bNum = parseInt(b.match(/\d+/)?.[0] || "0");
        return aNum - bNum;
      })
      .map((file) => `/data/${project.id}/${file}`);

    return imageFiles;
  } catch (error) {
    console.error("Error loading project images:", error);
    return [];
  }
}

export async function getAllProjectIds(): Promise<string[]> {
  try {
    const jsonDirectory = path.join(process.cwd(), "public", "data");
    const fileContents = await fs.readFile(
      jsonDirectory + "/projects.json",
      "utf8"
    );
    const projects = JSON.parse(fileContents);
    return projects.map((project: Project) => project.id);
  } catch (error) {
    console.error("Error loading project IDs:", error);
    return [];
  }
}
