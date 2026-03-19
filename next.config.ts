import type { NextConfig } from "next";
import { REPO_NAME } from "./src/lib/site-config";

const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? `/${REPO_NAME}` : undefined;

const nextConfig: NextConfig = {
    output: "export",
    trailingSlash: true,
    basePath,
    assetPrefix: basePath,
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],
    },
    turbopack: {
        root: process.cwd(),
    },
};

export default nextConfig;
