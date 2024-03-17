"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const __1 = require("..");
let AS = new __1.ActiveServer(new __1.ServerSettings("test", true, true));
AS.setPort(3000);
AS.setWebPath(path_1.default.join("app"));
AS.addAPIs(new __1.API("test", "test", ["GET"], (req, res) => {
    res.writeHead(200);
    res.end("test");
}));
AS.init();
