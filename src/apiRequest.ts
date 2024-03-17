import http from "http";
import { ActiveServer } from "..";
import { apiRequestLog } from "./log";
function handleApiRequest(server: ActiveServer, url: string, req: http.IncomingMessage, res: http.ServerResponse) {
  let APIEndpoint = server.APIs[url];
  
  if (APIEndpoint && req.method) {
    if (APIEndpoint.methods.includes(req.method)) {
      apiRequestLog(server, req.method || "GET", 200, url);
      APIEndpoint.run(req, res);
    } else {
      res.writeHead(405);
      res.end(`{"message": "Method not allowed"}`);
      apiRequestLog(server, req.method || "GET", 405, url);
      return;
    }
  } else {
    res.writeHead(404);
    res.end(`{"message": "Invalid api point"}`);
    apiRequestLog(server, req.method || "GET", 404, url);
  }
}

export { handleApiRequest }