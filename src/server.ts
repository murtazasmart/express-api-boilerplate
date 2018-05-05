#!/usr/bin/env node

/**
 * Dependencies
 */

import * as http from "http";
import { app } from "./index";

/**
 * Get port from environment and store in Express
 */

const port = app.get("port");

/**
 * Create HTTP server
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: any) {

  if (isNaN(parseInt(val, 10))) {
    return val;
  }

  if (parseInt(val, 10) >= 0) {
    return parseInt(val, 10);
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string"
    ? "Pipe " + port
    : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + ' requires elevated privileges'); // tslint:disable-line
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + ' is already in use'); // tslint:disable-line
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string"
    ? "pipe " + addr
    : "port " + addr.port;
  console.log("Listening on " + bind); // tslint:disable-line
}
