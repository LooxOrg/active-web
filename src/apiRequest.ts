import http from "http";
import { ActiveServer } from "..";
function handleApiRequest(server: ActiveServer, url: string, req: http.IncomingMessage, res: http.ServerResponse) {
  res.writeHead(200);
  res.end('Hello API!');

}

export { handleApiRequest }