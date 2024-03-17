import http from "http";
import path from "path";
import { fileAccessLog } from "./log";
import { getContentType } from "./content";
import { ActiveServer } from "..";
import { respondWithError } from "./utils";

function handleStaticFileRequest( server: ActiveServer, url: string | undefined, req: http.IncomingMessage, res: http.ServerResponse) {
  if (!url) {
    respondWithError(res, "500 Interal server error");
    return;
  }
  
  
}


export { handleStaticFileRequest }