# Project Configuration Guide

This guide explains how to configure projects in `projects.json` to control every aspect of the project display page.

## Basic Project Structure

```json
{
  "id": "project-id",
  "title": "Project Title",
  "description": "Project description",
  "tech": ["Technology1", "Technology2"],
  "links": {
    "website": "https://example.com",
    "github": "https://github.com/user/repo",
    "github2": "https://github.com/user/repo2",
    "github3": "https://github.com/user/repo3",
    "npm": "https://npmjs.com/package/name",
    "behance": "https://behance.net/gallery/id",
    "playstore": "https://play.google.com/store/apps/details?id=com.app"
  },
  "image": "/data/project-folder/1.png",
  "featured": true
}
```

## Advanced Configuration

Add a `config` object to control advanced features:

### Image Configuration (`imageConfig`)

```json
"config": {
  "imageConfig": {
    "type": "standard | multiDirectory",
    "directories": ["web", "android", "ios"],
    "maxImages": 50,
    "consecutiveMisses": 3,
    "imageFormat": "png | jpg | auto"
  }
}
```

- **type**:
  - `"standard"` - Single directory (default)
  - `"multiDirectory"` - Multiple subdirectories
- **directories**: Array of subdirectory names for multi-directory projects
- **maxImages**: Maximum number of images to check (default: 50)
- **consecutiveMisses**: Stop after X consecutive missing images (default: 3)
- **imageFormat**: Force specific format or auto-detect from main image

### Display Configuration (`displayConfig`)

```json
"displayConfig": {
  "mobileImageHandling": "contain | cover",
  "showPlatformIndicators": true,
  "platformLabels": {
    "web": "🌐 Web Version",
    "mobile": "📱 Mobile Version",
    "android": "📱 Android Version",
    "ios": "📱 iOS Version"
  }
}
```

- **mobileImageHandling**: How to display mobile screenshots
  - `"contain"` - Show full image with padding
  - `"cover"` - Crop to fill container
- **showPlatformIndicators**: Show platform labels on images
- **platformLabels**: Custom labels for each platform

### Gallery Configuration (`galleryConfig`)

```json
"galleryConfig": {
  "thumbnailCount": 9,
  "autoplay": false,
  "autoplayInterval": 5000
}
```

- **thumbnailCount**: Number of thumbnails visible at once (default: 9)
- **autoplay**: Enable automatic slideshow (default: false)
- **autoplayInterval**: Time between slides in milliseconds (default: 5000)

## Example Configurations

### 1. Standard Project (Default)

```json
{
  "id": "simple-project",
  "title": "Simple Project",
  "description": "A standard project with regular image loading",
  "tech": ["React", "CSS"],
  "links": {
    "website": "https://example.com",
    "github": "https://github.com/user/repo"
  },
  "image": "/data/simple-project/1.png",
  "featured": false
}
```

### 2. Multi-Platform Project (Like Error20)

```json
{
  "id": "multi-platform-app",
  "title": "Multi-Platform App",
  "description": "An app with both web and mobile versions",
  "tech": ["React", "React Native"],
  "links": {
    "website": "https://example.com",
    "github": "https://github.com/user/web-repo",
    "github2": "https://github.com/user/mobile-repo",
    "playstore": "https://play.google.com/store/apps/details?id=com.app"
  },
  "image": "/data/multi-platform-app/web/1.png",
  "featured": true,
  "config": {
    "imageConfig": {
      "type": "multiDirectory",
      "directories": ["web", "android", "ios"],
      "maxImages": 15,
      "consecutiveMisses": 2
    },
    "displayConfig": {
      "mobileImageHandling": "contain",
      "showPlatformIndicators": true,
      "platformLabels": {
        "web": "🌐 Web App",
        "android": "🤖 Android App",
        "ios": "📱 iOS App"
      }
    },
    "galleryConfig": {
      "thumbnailCount": 8
    }
  }
}
```

### 3. Large Image Gallery

```json
{
  "id": "design-showcase",
  "title": "Design Showcase",
  "description": "A project with many design iterations",
  "tech": ["Figma", "Photoshop"],
  "links": {
    "behance": "https://behance.net/gallery/123456"
  },
  "image": "/data/design-showcase/1.jpg",
  "featured": false,
  "config": {
    "imageConfig": {
      "maxImages": 100,
      "consecutiveMisses": 5,
      "imageFormat": "jpg"
    },
    "galleryConfig": {
      "thumbnailCount": 12,
      "autoplay": true,
      "autoplayInterval": 3000
    }
  }
}
```

## Directory Structure Examples

### Standard Project

```
public/data/project-name/
├── 1.png
├── 2.png
├── 3.png
└── ...
```

### Multi-Directory Project

```
public/data/project-name/
├── web/
│   ├── 1.png
│   ├── 2.png
│   └── ...
├── android/
│   ├── 1.png
│   ├── 2.png
│   └── ...
└── ios/
    ├── 1.png
    ├── 2.png
    └── ...
```

## Adding New Projects

1. Create project folder in `/public/data/`
2. Add numbered images starting from 1
3. Add project entry to `projects.json`
4. Optionally add `config` object for advanced features
5. Test the project page

The system will automatically:

- Detect available images
- Handle different image formats
- Apply appropriate display settings
- Show platform indicators (if configured)
- Create responsive thumbnails
