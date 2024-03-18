# Active Web

Active web is an easy way to make node.js web servers with APIs

## 1) Installation

```
npm i active-web

```

## 2) Usage

```ts
import path from "path";
import { API, ActiveServer, ServerSettings } from "active-web";

let config = new ServerSettings(
  "test", // the name of the server
  true, // does the server return web files
  true //does the server has an API
  )
// Create the server
let AS = new ActiveServer(config);

// Define the port its going to listen on
AS.setPort(3000)

// Set the folder where the server take the files
AS.setWebPath(path.join("app"))
// Create and add an API url 
AS.addAPIs(new API(
  "test", // The name of the API
  "test/info/", // The URL of the API
  ["GET"], // The allowed methods
  (req, res) => { // The function that will be runned if the API is called
    res.writeHead(200)
    res.end("test")
  }
))

// Last thing to do initiate the Webserver
AS.init()

```
