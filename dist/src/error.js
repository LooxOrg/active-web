"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerErrorMessage = void 0;
function getServerErrorMessage(server) {
    if (!server.enableWeb && !server.enableAPI) {
        return "Can't create server with no API or web application";
    }
    else if (!server.port) {
        return "Can't create server with no port defined (Use setPort to set it)";
    }
    else if (!server.webPath) {
        return "Can't create web access without a web path (Use setWebPath to set it)";
    }
    else {
        return "Can't create API access without APIs defined (Use addAPIs to set it)";
    }
}
exports.getServerErrorMessage = getServerErrorMessage;
