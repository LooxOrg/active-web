// Import the http module
import { existsSync, readFileSync } from 'fs';
import http, { IncomingMessage, METHODS, ServerResponse } from 'http';
import path from 'path';
import colors from './color';
import { fileAccessLog } from './src/log';
import { getContentType } from './src/content';
import { getServerErrorMessage } from './src/error';
import { returnFileNotFound } from './src/requestReturns';
import { canCreateServer } from './src/utils';
import { handleStaticFileRequest } from './src/fileRequest';
import { handleRequest } from './src/request';

class ActiveServer {
  name: string;
  port?: number;
  // Path to the web file from root
  webPath?: string;
  enableAPI: boolean;
  enableWeb: boolean;
  APIs: Record<string, unknown> = {};
  private WebServer?: http.Server;
  
  
  
  constructor(config: ServerSettings) {
    this.name = config.name;
    this.enableAPI = config.enableAPI;
    this.enableWeb = config.enableWeb;
  }
  
  setPort(port: number) {
    this.port = port;
  }
  
  setWebPath(webPath: string) {
    if (existsSync(webPath)) {
      this.webPath = webPath;
    } else {
      throw new Error("The provided file path do not exist");
    }
  }
  
  addAPIs(apis: Record<string, unknown>) {
    this.APIs = apis;
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

class ServerSettings {
  name: string;
  enableAPI: boolean;
  enableWeb: boolean;
  constructor(name: string, enableWeb: boolean, enableAPI: boolean) {
    this.name = name;
    this.enableAPI = enableAPI;
    this.enableWeb = enableWeb;
  }
}

export {ActiveServer, ServerSettings};



