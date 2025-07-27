import { useState, useEffect, useCallback } from "react";
import { Project } from "../types/project";

export const useProjectData = (projectId: string) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await fetch("/data/projects.json");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        const foundProject = data.find((p: Project) => p.id === projectId);

        if (!foundProject) {
          setError("Project not found");
        } else {
          setProject(foundProject);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  return { project, loading, error };
};

export const useProjectImages = (project: Project | null) => {
  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [imagesLoading, setImagesLoading] = useState(false);

  const checkImageExists = useCallback(
    async (imagePath: string): Promise<boolean> => {
      try {
        const response = await fetch(imagePath, { method: "HEAD" });
        return response.ok;
      } catch {
        return false;
      }
    },
    []
  );

  useEffect(() => {
    if (!project) return;

    const loadImages = async () => {
      setImagesLoading(true);
      const validImages: string[] = [];

      const basePath = project.image.substring(
        0,
        project.image.lastIndexOf("/") + 1
      );
      const extension = project.image.substring(project.image.lastIndexOf("."));

      const imageConfig = project.config?.imageConfig;
      const maxImages = imageConfig?.maxImages || 10;
      const consecutiveMisses = imageConfig?.consecutiveMisses || 1;
      const imageType = imageConfig?.type || "standard";

      if (imageType === "multiDirectory" && imageConfig?.directories) {
        for (const directory of imageConfig.directories) {
          const directoryBasePath = `/data/${project.id}/${directory}/`;
          let imageIndex = 1;
          let misses = 0;

          while (misses < consecutiveMisses && imageIndex <= maxImages) {
            const imagePath = `${directoryBasePath}${imageIndex}${extension}`;
            const exists = await checkImageExists(imagePath);

            if (exists) {
              validImages.push(imagePath);
              misses = 0;
            } else {
              misses++;
            }

            imageIndex++;
          }
        }
      } else {
        let imageIndex = 1;
        let misses = 0;

        while (misses < consecutiveMisses && imageIndex <= maxImages) {
          const imagePath = `${basePath}${imageIndex}${extension}`;
          const exists = await checkImageExists(imagePath);

          if (exists) {
            validImages.push(imagePath);
            misses = 0;
          } else {
            misses++;
          }

          imageIndex++;
        }
      }

      setProjectImages(validImages);
      setImagesLoading(false);
    };

    loadImages();
  }, [project, checkImageExists]);

  return { projectImages, imagesLoading };
};
