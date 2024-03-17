// Import the http module
import { existsSync } from 'fs';
import http from 'http';
import path from 'path';
import { serverLog } from './src/log';
import { getServerErrorMessage } from './src/error';
import { canCreateServer } from './src/utils';
import { handleRequest } from './src/request';
import ServerSettings from './src/constructor/ServerSettings';
import API from './src/constructor/API';

class ActiveServer {
  name: string;
  port?: number;
  // Path to the web file from root
  webPath?: string;
  enableAPI: boolean;
  enableWeb: boolean;
  APIs: { [key: string]: API }; // Object with string keys and API values
  private WebServer?: http.Server;
  
  
  
  constructor(config: ServerSettings) {
    this.name = config.name;
    this.enableAPI = config.enableAPI;
    this.enableWeb = config.enableWeb;
    this.APIs = {};
  }
  
  setPort(port: number) {
    this.port = port;
  }
  
  setWebPath(webPath: string) {
    if (existsSync(path.join(process.cwd(), webPath))) {
      this.webPath = webPath;
      serverLog(this, `Web path set to ${webPath}`);
    } else {
      throw new Error("The provided directory path do not exist");
    }
  }
  
  addAPIs(api: API) {
    if (!this.APIs[api.url]) {
      this.APIs[api.url] = api;
    } else {
      throw new Error(`API with url ${api.url} already exists`);
    }
  }
  
  private createServer() {
    this.WebServer = http.createServer((req, res) => {
      handleRequest(this, req, res);
    });
  }
  
  
  /**
   * Initializes the server based on the provided settings.
   * Throws an error if the server cannot be created due to missing settings.
   */
  init() {
    // Check if server can be created
    if (!canCreateServer(this)) {
      throw new Error(getServerErrorMessage(this));
    }
    else {
      // Create the server
      this.createServer();
      this.WebServer?.listen(this.port);
    }
  }
  
}



export {ActiveServer, ServerSettings, API};

