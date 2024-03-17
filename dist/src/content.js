"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentType = void 0;
function getContentType(extension) {
    const mimeTypes = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "application/javascript",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".svg": "image/svg+xml"
    };
    return mimeTypes[extension] || "application/octet-stream";
}
exports.getContentType = getContentType;
