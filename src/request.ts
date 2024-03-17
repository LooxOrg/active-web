import http from "http";
import { ActiveServer } from "..";
import { handleStaticFileRequest } from "./fileRequest";
import { handleApiRequest } from "./apiRequest";

function handleRequest(server: ActiveServer, req: http.IncomingMessage, res: http.ServerResponse) {
  let url = req.url?.split("?")[0];
  if (url?.startsWith("/api") && server.enableAPI) {
    handleApiRequest(server, url, req, res);
  } else if (!url?.startsWith("/api") && server.enableAPI && !server.enableWeb) {
    res.writeHead(200);
    res.end('<h1> Invalid Access </h1>');
  } else if(server.enableWeb) {
    handleStaticFileRequest(server, url, req, res);
  } else {
    throw new Error("Something isn't right, if you see this message you modified the source code.");
  }
}


export { handleRequest }