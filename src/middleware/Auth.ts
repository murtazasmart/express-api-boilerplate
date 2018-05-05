import { NextFunction, Request, Response } from "express";
import * as JWT from "jsonwebtoken";
import { GlobalDI } from "../inversify.config";
import { Logger } from "../util/Logger";
import { IToken } from "./IToken";

const logger = GlobalDI.get<Logger>("Logger");

export interface IRequest extends Request {
  user: IToken;
}

export function auth(options: any) {
  if (!options || !options.secret) {
    throw new Error("secret should be set");
  }
  const secretkey = options.secret;

  const middleware = (req: IRequest, res: Response, next: NextFunction) => {
    let token;
    if (req.headers && req.headers.authorization) {
      const parts = req.get("authorization").split(" ");
      if (parts.length === 2) {
        const scheme = parts[0];
        const credentials = parts[1];

        if (/^Bearer$/i.test(scheme)) {
          token = credentials;
        } else {
          logger.info("credentials_bad_scheme, Format is Authorization: Bearer [token]");
          return res.status(401).json({ err: "credentials_bad_scheme, Format is Authorization: Bearer [token]" });
        }

      } else {
        logger.info("credentials_bad_scheme, Format is Authorization: Bearer [token]");
        return res.status(401).json({ err: "credentials_bad_scheme, Format is Authorization: Bearer [token]" });
      }

      if (!token) {
        logger.info("No authorization token was found");
        return res.status(401).json({err: "No authorization token was found"});
      }

      JWT.verify(token, secretkey, (err: any, decodedToken: string) => {
        if (err || !decodedToken) {
          logger.info("Authentication failed");
          return res.status(401).json({err: "Authentication failed"});
        } else {
          const dToken: any = decodedToken;
          req.user = {
            address: dToken.address,
            auth_time: dToken.auth_time,
            company: dToken.company,
            domain: dToken.domain,
            email: dToken.email,
            exp: dToken.exp,
            iat: dToken.iat,
            locale: dToken.locale,
            name: dToken.name,
            permissions: dToken.permissions,
            phone_number: dToken.phone_number,
            tenantID: dToken.tenantID,
            type: dToken.type,
            userID: dToken.userID,
            username: dToken.username,
          };

          next();
        }

      });
    } else {
      logger.info("Authentication failed");
      return res.status(401).json({err: "Authentication failed"});
    }
  };
  return middleware;
}
