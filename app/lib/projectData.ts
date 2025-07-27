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
    // Map project IDs to actual directory names
    const directoryMap: Record<string, string> = {
      airaware: "AirAware",
      "ai-text-detector": "ai text detect",
      "local-coding-exam": "Local Codeing Exam System",
      "cpp-python-translator": "cpp python translator",
      "student-id-dashboard": "Student-ID-Card-Dashboard",
      "student-admission": "Student Admission",
      "ebook-platform": "ebook",
      rcsandwitch: "rcsandwitch",
      error20: "error20",
      "pinterest-clone": "pinterest-clone",
      "personal-exam-app": "personal-exam-app",
    };

    const actualDirectoryName = directoryMap[project.id] || project.id;

    const projectImagesDir = path.join(
      process.cwd(),
      "public",
      "data",
      actualDirectoryName
    );

    // Check if directory exists
    try {
      await fs.access(projectImagesDir);
    } catch {
      console.log(
        `No image directory found for project: ${project.id} (looking for: ${actualDirectoryName})`
      );
      return [];
    }

    const files = await fs.readdir(projectImagesDir);

    // Filter image files and sort them
    const imageExtensions = [".png", ".jpg", ".jpeg", ".gif", ".webp"];
    let imageFiles: string[] = [];

    // First, try to get images from the root directory
    const rootImages = files
      .filter((file) =>
        imageExtensions.some((ext) => file.toLowerCase().endsWith(ext))
      )
      .sort((a, b) => {
        const aNum = parseInt(a.match(/\d+/)?.[0] || "0");
        const bNum = parseInt(b.match(/\d+/)?.[0] || "0");
        return aNum - bNum;
      })
      .map((file) => `/data/${actualDirectoryName}/${file}`);

    imageFiles = rootImages;

    // If no images in root, check subdirectories
    if (imageFiles.length === 0) {
      // Define priority order for subdirectories (web first for error20)
      const priorityOrder = project.id === "error20" ? ["web", "android"] : [];
      const processedDirs = new Set<string>();

      // First, process priority directories
      for (const priorityDir of priorityOrder) {
        if (files.includes(priorityDir)) {
          try {
            const fullPath = path.join(projectImagesDir, priorityDir);
            const stat = await fs.stat(fullPath);

            if (stat.isDirectory()) {
              const subFiles = await fs.readdir(fullPath);
              const subImages = subFiles
                .filter((file) =>
                  imageExtensions.some((ext) =>
                    file.toLowerCase().endsWith(ext)
                  )
                )
                .sort((a, b) => {
                  const aNum = parseInt(a.match(/\d+/)?.[0] || "0");
                  const bNum = parseInt(b.match(/\d+/)?.[0] || "0");
                  return aNum - bNum;
                })
                .map(
                  (file) =>
                    `/data/${actualDirectoryName}/${priorityDir}/${file}`
                );

              imageFiles.push(...subImages);
              processedDirs.add(priorityDir);
            }
          } catch (subdirError) {
            console.log(
              `Error processing priority directory ${priorityDir}:`,
              subdirError
            );
          }
        }
      }

      // Then process remaining directories
      for (const item of files) {
        if (processedDirs.has(item)) continue;

        try {
          const fullPath = path.join(projectImagesDir, item);
          const stat = await fs.stat(fullPath);

          if (stat.isDirectory()) {
            const subFiles = await fs.readdir(fullPath);
            const subImages = subFiles
              .filter((file) =>
                imageExtensions.some((ext) => file.toLowerCase().endsWith(ext))
              )
              .sort((a, b) => {
                const aNum = parseInt(a.match(/\d+/)?.[0] || "0");
                const bNum = parseInt(b.match(/\d+/)?.[0] || "0");
                return aNum - bNum;
              })
              .map((file) => `/data/${actualDirectoryName}/${item}/${file}`);

            imageFiles.push(...subImages);
          }
        } catch (subdirError) {
          console.log(`Error processing item ${item}:`, subdirError);
        }
      }
    }
    console.log(`Found ${imageFiles.length} images for project: ${project.id}`);
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
