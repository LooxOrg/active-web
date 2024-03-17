"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleApiRequest = void 0;
const log_1 = require("./log");
function handleApiRequest(server, url, req, res) {
    let APIEndpoint = server.APIs[url];
    if (APIEndpoint && req.method) {
        if (APIEndpoint.methods.includes(req.method)) {
            (0, log_1.apiRequestLog)(server, req.method || "GET", 200, url);
            APIEndpoint.run(req, res);
        }
        else {
            res.writeHead(405);
            res.end(`{"message": "Method not allowed"}`);
            (0, log_1.apiRequestLog)(server, req.method || "GET", 405, url);
            return;
        }
    }
    else {
        res.writeHead(404);
        res.end(`{"message": "Invalid api point"}`);
        (0, log_1.apiRequestLog)(server, req.method || "GET", 404, url);
    }
}
exports.handleApiRequest = handleApiRequest;
