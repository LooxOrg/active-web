function getContentType(extension: string): string {
  const mimeTypes: { [key: string]: string } = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml"
  };
  return mimeTypes[extension] || "application/octet-stream";
}

export { getContentType }