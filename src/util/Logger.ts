import { injectable } from "inversify";
import { LoggerInstance, Winston } from "winston";
import * as winston from "winston";

/**
 * This class wraps winston functionality.
 * Basic logging functions are exposed.
 * Winston instance can be accessed by logger
 * TODO: Add more transports for logging into files
 */
@injectable()
export class Logger {
  public logger: LoggerInstance;

  constructor() {
    this.logger = new winston.Logger({
      transports: [
        new winston.transports.Console({
          colorize: true,
          level: "silly",
          timestamp: true,
        }),
        new winston.transports.File({
          filename: "logs/debug.log",
          level: "debug",
          name: "Debug Log",
          timestamp: true,
        }),
        new winston.transports.File({
          filename: "logs/all.log",
          level: "silly",
          maxsize: 10000000, // 10MB
          name: "All Log",
          timestamp: true,
          zippedArchive: true,
        }),
        new winston.transports.File({
          filename: "logs/error.log",
          level: "error",
          maxsize: 10000000, // 10MB
          name: "Error Log",
          timestamp: true,
          zippedArchive: true,
        }),
      ],
    });
    this.logger.info("We can Log :)");
  }

  /**
   * log
   */
  public log(level: string, msg: string) {
    this.logger.log(level, msg);
  }

  /**
   * error
   */
  public error(msg: string) {
    this.logger.error(msg);
  }

  /**
   * warn
   */
  public warn(msg: string) {
    this.logger.warn(msg);
  }

  /**
   * info
   */
  public info(msg: string) {
    this.logger.info(msg);
  }

  /**
   * verbose
   */
  public verbose(msg: string) {
    this.logger.verbose(msg);
  }

  /**
   * debug
   */
  public debug(msg: string) {
    this.logger.debug(msg);
  }

  /**
   * silly
   */
  public silly(msg: string) {
    this.logger.silly(msg);
  }

}
