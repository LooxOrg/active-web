"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServerSettings {
    constructor(name, enableWeb, enableAPI) {
        this.name = name;
        this.enableAPI = enableAPI;
        this.enableWeb = enableWeb;
    }
}
exports.default = ServerSettings;
