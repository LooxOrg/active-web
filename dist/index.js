"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerSettings = exports.ActiveServer = void 0;
// Import the http module
const fs_1 = require("fs");
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const color_1 = __importDefault(require("./color"));
const log_1 = require("./src/log");
// Define the port to listen on
const port = process.env.PORT || 3000;
const webAppPath = path_1.default.join(__dirname, "..", "app");
class ActiveServer {
    constructor(config) {
        this.APIs = {};
        this.name = config.name;
        this.enableAPI = config.enableAPI;
        this.enableWeb = config.enableWeb;
    }
    setPort(port) {
        this.port = port;
    }
    setWebPath(webPath) {
        if ((0, fs_1.existsSync)(webPath)) {
            this.webPath = webPath;
        }
        else {
            throw new Error("The provided file path do not exist");
        }
    }
    addAPIs(apis) {
        this.APIs = apis;
    }
    createServer() {
        this.WebServer = http_1.default.createServer((req, res) => {
            this.handleRequest(req, res);
        });
    }
    /**
     * Handles an incoming request.
     *
     * @param {http.IncomingMessage} req - The incoming request.
     * @param {http.ServerResponse} res - The server response.
     */
    handleRequest(req, res) {
        var _a;
        let url = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split("?")[0];
        if ((url === null || url === void 0 ? void 0 : url.startsWith("/api")) && this.enableAPI) {
            this.handleApiRequest(url, req, res);
        }
        else if (!(url === null || url === void 0 ? void 0 : url.startsWith("/api")) && this.enableAPI && !this.enableWeb) {
            res.writeHead(200);
            res.end('<h1> Invalid Access </h1>');
        }
        else if (this.enableWeb) {
            this.handleStaticFileRequest(url, req, res);
        }
        else {
            throw new Error("Something isn't right, if you see this message you modified the source code.");
        }
    }
    handleStaticFileRequest(url, req, res) {
        if (!url) {
            this.respondWithError(res, "Error: Could not fetch resource");
            return;
        }
        const filePath = path_1.default.join(webAppPath, url);
        const isDirectory = url.endsWith("/");
        const fileExtension = path_1.default.extname(url);
        const contentType = isDirectory ? "text/html" : this.getContentType(fileExtension);
        if (this.fileExists(filePath, res, url)) {
            this.sendFile(res, filePath, contentType);
            (0, log_1.fileAccessLog)(this, req.method || "GET", 200, filePath);
        }
    }
    respondWithError(res, arg1) {
        res.writeHead(500);
        res.end(arg1);
    }
    getStatusColor(arg1) {
        const statusColors = {
            200: color_1.default.green,
            304: color_1.default.magenta,
            404: color_1.default.red
        };
        if (statusColors[arg1]) {
            return statusColors[arg1];
        }
        return color_1.default.green;
    }
    getMethodColor(method) {
        const methodColors = {
            "GET": color_1.default.green,
            "POST": color_1.default.cyan,
            "PUT": color_1.default.yellow,
            "DELETE": color_1.default.red
        };
        if (method !== undefined && methodColors[method]) {
            return methodColors[method];
        }
        return color_1.default.green; // Default color
    }
    getContentType(extension) {
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
    fileExists(filePath, res, url) {
        if (!(0, fs_1.existsSync)(filePath)) {
            this.returnFileNotFound(res, url);
            return false;
        }
        return true;
    }
    returnFileNotFound(res, url) {
        res.writeHead(404);
        res.end(`File not found`);
    }
    sendFile(res, filePath, contentType) {
        res.writeHead(200, { "Content-Type": contentType });
        res.write((0, fs_1.readFileSync)(filePath));
        res.end();
    }
    handleApiRequest(url, req, res) {
        res.writeHead(200);
        res.end('Hello API!');
    }
    /**
     * Initializes the server based on the provided settings.
     * Throws an error if the server cannot be created due to missing settings.
     */
    init() {
        var _a;
        // Check if server can be created
        if (!this.canCreateServer()) {
            throw new Error(this.getErrorMessage());
        }
        else {
            // Create the server
            this.createServer();
            (_a = this.WebServer) === null || _a === void 0 ? void 0 : _a.listen(this.port);
        }
    }
    /**
     * Checks if the server can be created based on the provided settings.
     * @returns {boolean} True if server can be created, false otherwise.
     */
    canCreateServer() {
        return ((!this.enableWeb && !this.enableAPI) ? false :
            (!this.port) ? false :
                (this.enableWeb && !this.webPath) ? false :
                    (this.enableAPI && !this.APIs) ? false : true);
    }
    /**
     * Returns an error message based on the missing settings.
     * @returns {string} The error message.
     */
    getErrorMessage() {
        if (!this.enableWeb && !this.enableAPI) {
            return "Can't create server with no API or web application";
        }
        else if (!this.port) {
            return "Can't create server with no port defined (Use setPort to set it)";
        }
        else if (!this.webPath) {
            return "Can't create web access without a web path (Use setWebPath to set it)";
        }
        else {
            return "Can't create API access without APIs defined (Use addAPIs to set it)";
        }
    }
}
exports.ActiveServer = ActiveServer;
class ServerSettings {
    constructor(name, enableWeb, enableAPI) {
        this.name = name;
        this.enableAPI = enableAPI;
        this.enableWeb = enableWeb;
    }
}
exports.ServerSettings = ServerSettings;
