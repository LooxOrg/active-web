"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRequest = void 0;
const fileRequest_1 = require("./fileRequest");
const apiRequest_1 = require("./apiRequest");
function handleRequest(server, req, res) {
    var _a;
    let url = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split("?")[0];
    if ((url === null || url === void 0 ? void 0 : url.startsWith("/api")) && server.enableAPI) {
        (0, apiRequest_1.handleApiRequest)(server, url, req, res);
    }
    else if (!(url === null || url === void 0 ? void 0 : url.startsWith("/api")) && server.enableAPI && !server.enableWeb) {
        res.writeHead(200);
        res.end('<h1> Invalid Access </h1>');
    }
    else if (server.enableWeb) {
        (0, fileRequest_1.handleStaticFileRequest)(server, url, req, res);
    }
    else {
        throw new Error("Something isn't right, if you see this message you modified the source code.");
    }
}
exports.handleRequest = handleRequest;
