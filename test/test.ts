import path from "path";
import { API, ActiveServer, ServerSettings } from "..";

let AS = new ActiveServer(new ServerSettings("test", true, true));

AS.setPort(3000)
AS.setWebPath(path.join("app"))
AS.addAPIs(new API("test", "test", ["GET"], (req, res) => {
  res.writeHead(200)
  res.end("test")
}))
AS.init()