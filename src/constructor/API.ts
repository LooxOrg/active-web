import { IncomingMessage, ServerResponse } from "http";

class API {
  name: string;
  url: string;
  methods: string[];
  cb: ((req: IncomingMessage, res: ServerResponse) => void) ;
  constructor(name: string, url: string, methods: string[], cb: (req: IncomingMessage, res: ServerResponse) => void){
    this.name = name

    this.url = url
    this.methods = methods
    this.cb = cb
  }

  run(req: IncomingMessage, res: ServerResponse) {
    if (typeof this.cb === 'function') {
      this.cb(req, res);
    }
  }



}
export default API