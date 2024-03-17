"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnFileNotFound = void 0;
const log_1 = require("./log");
function returnFileNotFound(server, req, res, url) {
    res.writeHead(404);
    res.end(`File not found`);
    (0, log_1.fileAccessLog)(server, req.method || "GET", 404, url);
}
exports.returnFileNotFound = returnFileNotFound;
