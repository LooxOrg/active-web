"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class API {
    constructor(name, url, methods, cb) {
        this.name = name;
        this.url = url;
        this.methods = methods;
        this.cb = cb;
    }
    run(req, res) {
        if (typeof this.cb === 'function') {
            this.cb(req, res);
        }
    }
}
exports.default = API;
