"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleApiRequest = void 0;
function handleApiRequest(server, url, req, res) {
    res.writeHead(200);
    res.end('Hello API!');
}
exports.handleApiRequest = handleApiRequest;
