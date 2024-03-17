"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStaticFileRequest = void 0;
const path_1 = __importDefault(require("path"));
const log_1 = require("./log");
const content_1 = require("./content");
const utils_1 = require("./utils");
function handleStaticFileRequest(server, url, req, res) {
    if (!url) {
        (0, utils_1.respondWithError)(res, "500 Interal server error");
        return;
    }
    if (url.endsWith("/")) {
        url = url + "index.html";
    }
    let filePath = path_1.default.join(process.cwd(), server.webPath || "", url);
    if (!filePath.startsWith(process.cwd())) {
        (0, utils_1.respondWithError)(res, "403 Forbidden");
        return;
    }
    let contentType = (0, content_1.getContentType)(path_1.default.extname(url));
    if ((0, utils_1.fileExists)(server, filePath, req, res, url)) {
        (0, log_1.fileAccessLog)(server, req.method || "GET", 200, url);
        (0, utils_1.sendFile)(res, filePath, contentType);
    }
}
exports.handleStaticFileRequest = handleStaticFileRequest;
