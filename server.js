// class Server {
//   constructor() {
//     this.requires();
//     this.initializeServer();
//   }

//   requires() {
//     this.http = require("http"); // pour utiliser le serveur HTTP
//     this.app = require("./App");
//   }
//   normalizePort(val) {
//     const port = parseInt(val, 10);

//     if (isNaN(port)) {
//       return val;
//     }
//     if (port >= 0) {
//       return port;
//     }
//     return false;
//   }

//   errorHandler(error) {
//     if (error.syscall !== "listen") {
//       throw error;
//     }
//     const address = this.server.address();
//     const bind =
//       typeof address === "string" ? "pipe " + address : "port: " + this.port;
//     switch (error.code) {
//       case "EACCES":
//         console.error(bind + " requires elevated privileges.");
//         process.exit(1);
//         break;
//       case "EADDRINUSE":
//         console.error(bind + " is already in use.");
//         process.exit(1);
//         break;
//       default:
//         throw error;
//     }
//   }

//   initializeServer() {
//     this.port = this.normalizePort(process.env.PORT || "3000");
//     this.server = this.http.createServer(this.app);
//     this.app.set("port", this.port);
//     this.server.on("error", this.errorHandler);
//     this.server.on("listening", () => {
//       const address = this.server.address();
//       const bind =
//         typeof address === "string" ? "pipe " + address : "port " + this.port;
//       console.log("Listening on " + bind);
//     });
//     this.server.listen(this.port);
//   }
// }

// new Server();

// import http from "http";
// import { App } from "./App.js";

// class Server {
//   constructor() {
//     this.startApp = new App();
//     this.initializeServer();
//   }

//   normalizePort(val) {
//     const port = parseInt(val, 10);

//     if (isNaN(port)) {
//       return val;
//     }
//     if (port >= 0) {
//       return port;
//     }
//     return false;
//   }

//   errorHandler(error) {
//     if (error.syscall !== "listen") {
//       throw error;
//     }
//     const address = this.server.address();
//     const bind =
//       typeof address === "string" ? "pipe " + address : "port: " + this.port;
//     switch (error.code) {
//       case "EACCES":
//         console.error(bind + " requires elevated privileges.");
//         process.exit(1);
//         break;
//       case "EADDRINUSE":
//         console.error(bind + " is already in use.");
//         process.exit(1);
//         break;
//       default:
//         throw error;
//     }
//   }

//   initializeServer() {
//     this.port = this.normalizePort(process.env.PORT || "3000");
//     this.server = http.createServer(this.startApp.app);
//     this.startApp.app.set("port", this.port);
//     this.server.on("error", this.errorHandler);
//     this.server.on("listening", () => {
//       const address = this.server.address();
//       const bind =
//         typeof address === "string" ? "pipe " + address : "port " + this.port;
//       console.log("Listening on " + bind);
//     });
//     this.server.listen(this.port);
//   }
// }

// new Server();

const http = require("http"); // pour utiliser le serveur HTTP
const app = require("./App");

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);
