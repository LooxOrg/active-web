import http from "http";
import { existsSync, readFileSync } from "fs";
import { ActiveServer } from "..";
import { returnFileNotFound } from "./requestReturns";

function canCreateServer(server: ActiveServer): boolean {
  return (
    (!server.enableWeb && !server.enableAPI) ? false : 
    (!server.port) ? false : 
    (server.enableWeb && !server.webPath) ? false : 
    (server.enableAPI && !server.APIs) ? false : true
  );
}

function sendFile(res: http.ServerResponse, filePath: string, contentType: string) {
  res.writeHead(200, { "Content-Type": contentType });
  res.write(readFileSync(filePath));
  res.end();
}

function respondWithError(res: http.ServerResponse, arg1: string) {
  res.writeHead(500);
  res.end(arg1);
}


function fileExists(server: ActiveServer, filePath: string, req: http.IncomingMessage, res: http.ServerResponse, url: string): boolean {
  if (!existsSync(filePath)) {
    returnFileNotFound(server, req, res, url);
    return false;
  }
  return true;
}
export { canCreateServer, sendFile, respondWithError }