"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileExists = exports.respondWithError = exports.sendFile = exports.canCreateServer = void 0;
const fs_1 = require("fs");
const requestReturns_1 = require("./requestReturns");
function canCreateServer(server) {
    return ((!server.enableWeb && !server.enableAPI) ? false :
        (!server.port) ? false :
            (server.enableWeb && !server.webPath) ? false :
                (server.enableAPI && !server.APIs) ? false : true);
}
exports.canCreateServer = canCreateServer;
function sendFile(res, filePath, contentType) {
    res.writeHead(200, { "Content-Type": contentType });
    res.write((0, fs_1.readFileSync)(filePath));
    res.end();
}
exports.sendFile = sendFile;
function respondWithError(res, arg1) {
    res.writeHead(500);
    res.end(arg1);
}
exports.respondWithError = respondWithError;
function fileExists(server, filePath, req, res, url) {
    if (!(0, fs_1.existsSync)(filePath)) {
        (0, requestReturns_1.returnFileNotFound)(server, req, res, url);
        return false;
    }
    return true;
}
exports.fileExists = fileExists;
