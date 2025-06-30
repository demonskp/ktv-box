export function isUrl(url?: string) {
    if (!url) return false;

    return url.startsWith("http://") || url.startsWith("https://")
}