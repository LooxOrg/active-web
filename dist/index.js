"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.API = exports.ServerSettings = exports.ActiveServer = void 0;
// Import the http module
const fs_1 = require("fs");
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const log_1 = require("./src/log");
const error_1 = require("./src/error");
const utils_1 = require("./src/utils");
const request_1 = require("./src/request");
const ServerSettings_1 = __importDefault(require("./src/constructor/ServerSettings"));
exports.ServerSettings = ServerSettings_1.default;
const API_1 = __importDefault(require("./src/constructor/API"));
exports.API = API_1.default;
class ActiveServer {
    constructor(config) {
        this.name = config.name;
        this.enableAPI = config.enableAPI;
        this.enableWeb = config.enableWeb;
        this.APIs = {};
    }
    setPort(port) {
        this.port = port;
    }
    setWebPath(webPath) {
        if ((0, fs_1.existsSync)(path_1.default.join(process.cwd(), webPath))) {
            this.webPath = webPath;
            (0, log_1.serverLog)(this, `Web path set to ${webPath}`);
        }
        else {
            throw new Error("The provided directory path do not exist");
        }
    }
    addAPIs(api) {
        if (!this.APIs[api.url]) {
            this.APIs[api.url] = api;
        }
        else {
            throw new Error(`API with url ${api.url} already exists`);
        }
    }
    createServer() {
        this.WebServer = http_1.default.createServer((req, res) => {
            (0, request_1.handleRequest)(this, req, res);
        });
    }
    /**
     * Initializes the server based on the provided settings.
     * Throws an error if the server cannot be created due to missing settings.
     */
    init() {
        var _a;
        // Check if server can be created
        if (!(0, utils_1.canCreateServer)(this)) {
            throw new Error((0, error_1.getServerErrorMessage)(this));
        }
        else {
            // Create the server
            this.createServer();
            (_a = this.WebServer) === null || _a === void 0 ? void 0 : _a.listen(this.port);
        }
    }
}
exports.ActiveServer = ActiveServer;
