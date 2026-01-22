import type { NextConfig } from "next";

// For GitHub Pages, use the repository name as basePath
// For local development, basePath is empty
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "VIBE";
const basePath = isGitHubPages ? `/${repoName}` : "";
const assetPrefix = isGitHubPages ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath,
  assetPrefix: assetPrefix,
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
