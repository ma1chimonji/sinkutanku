export const REPO_NAME = "sinkutanku";
export const SITE_NAME = "SINKUTANKU";
export const SITE_URL = `https://ma1chimonji.github.io/${REPO_NAME}/`;
export const REPO_URL = "https://github.com/ma1chimonji/sinkutanku";
export const BASE_PATH =
    process.env.NODE_ENV === "production" ? `/${REPO_NAME}` : "";

export function withBasePath(pathname: string): string {
    const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
    return `${BASE_PATH}${normalizedPath}`;
}
