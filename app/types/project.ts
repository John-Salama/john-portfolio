export interface Project {
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
  summary?: string;
  testAccounts?: {
    [role: string]: string;
  };
  config?: {
    imageConfig?: {
      type: "standard" | "multiDirectory";
      directories?: string[];
      maxImages?: number;
      consecutiveMisses?: number;
      imageFormat?: "png" | "jpg" | "auto";
    };
    displayConfig?: {
      mobileImageHandling?: "contain" | "cover";
      showPlatformIndicators?: boolean;
      platformLabels?: {
        web?: string;
        mobile?: string;
        android?: string;
        ios?: string;
      };
    };
    galleryConfig?: {
      thumbnailCount?: number;
      autoplay?: boolean;
      autoplayInterval?: number;
    };
  };
}
