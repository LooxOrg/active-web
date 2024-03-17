import http from "http";
import path from "path";
import { fileAccessLog } from "./log";
import { getContentType } from "./content";
import { ActiveServer } from "..";
import { fileExists, respondWithError, sendFile } from "./utils";
import { existsSync } from "fs";
import { returnFileNotFound } from "./requestReturns";

function handleStaticFileRequest( server: ActiveServer, url: string | undefined, req: http.IncomingMessage, res: http.ServerResponse) {
  if (!url) {
    respondWithError(res, "500 Interal server error");
    return;
  }
  if (url.endsWith("/")) {
    url = url + "index.html";
  }
  let filePath = path.join(process.cwd(), server.webPath || "", url);
  if (!filePath.startsWith(process.cwd())) {
    respondWithError(res, "403 Forbidden");
    return;
  }
  
  let contentType = getContentType(path.extname(url));
  if (fileExists(server, filePath, req, res, url)) {
    fileAccessLog(server, req.method || "GET", 200, url);
    sendFile(res, filePath, contentType);
  }

  
}


export { handleStaticFileRequest }