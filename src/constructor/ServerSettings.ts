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

export default ServerSettings