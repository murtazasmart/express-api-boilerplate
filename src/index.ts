import * as dotenv from "dotenv";
import * as express from "express";
import * as mongoose from "mongoose";

import { GlobalDI } from "./inversify.config";
import { Logger } from "./util/Logger";

/**
 * Configure dotenv. Doing this before importing the routes
 */
dotenv.config();

import * as apiV1 from "./routes/v1";

/**
 * Create Express Server
 */
const app = express();

const logger = GlobalDI.get<Logger>("Logger");

/**
 * Express Configuration
 */

app.set("port", process.env.PORT || 3000);

/**
 * MongoDB Connection
 */
mongoose.connection.on("connected", () => {
  logger.debug("DB Connection Established");
});

mongoose.connection.on("reconnected", () => {
  logger.debug("DB Connection Reestablished");
});

mongoose.connection.on("disconnected", () => {
  logger.debug("DB Connection Disconnected");
});

mongoose.connection.on("close", () => {
  logger.debug("DB Connection Closed");
});

mongoose.connection.on("error", (error) => {
  logger.error("ERROR: " + error);
});

mongoose.connect(process.env.MONGOLAB_URI, {
  autoReconnect: true,
  reconnectInterval: 500, // Reconnect every 500ms
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  useMongoClient: true,
}).then(() => {
  logger.info("Successfully conected to mongoDB");
}).catch((err) => {
  logger.error(err.message);
});

(mongoose as any).Promise = global.Promise; // Use global promises for mongoose

/**
 * API v1 Routes
 */

app.use("/api/v1", apiV1.router);

export { app };
