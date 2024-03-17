"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRequestLog = exports.fileAccessLog = exports.serverLog = void 0;
const color_1 = __importDefault(require("../color"));
function serverLog(server, ...args) {
    console.log(color_1.default.yellow + `[${server.name}-server]` + color_1.default.reset, ...args);
}
exports.serverLog = serverLog;
function fileAccessLog(server, method, status, file) {
    let methodColor = getMethodColor(method);
    let statusColor = getStatusColor(status);
    console.log(color_1.default.yellow + `[${server.name}-web]` + color_1.default.reset, methodColor + method, statusColor + status, file);
}
exports.fileAccessLog = fileAccessLog;
function apiRequestLog(server, method, status, api) {
    let methodColor = getMethodColor(method);
    let statusColor = getStatusColor(status);
    console.log(color_1.default.yellow + `[${server.name}-api]` + color_1.default.reset, methodColor + method, statusColor + status, api);
}
exports.apiRequestLog = apiRequestLog;
function getMethodColor(method) {
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
function getStatusColor(status) {
    const statusColors = {
        200: color_1.default.green,
        304: color_1.default.magenta,
        404: color_1.default.red
    };
    if (statusColors[status]) {
        return statusColors[status];
    }
    return color_1.default.green;
}
