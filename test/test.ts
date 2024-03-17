import path from "path";
import { ActiveServer, ServerSettings } from "..";

let AS = new ActiveServer(new ServerSettings("test", true, true));

AS.setPort(3000)
AS.setWebPath(path.join("app"))
AS.init()