import http from "http";
import { fileAccessLog } from "./log";
import { ActiveServer } from "..";

function returnFileNotFound(server: ActiveServer, req: http.IncomingMessage, res: http.ServerResponse, url: string) {
  res.writeHead(404);
  res.end(`File not found`);
  fileAccessLog(server, req.method || "GET", 404, url);
}



export { returnFileNotFound }