import { NextFunction, Request, Response, Router } from "express";

import * as bodyParser from "body-parser";
import * as JWT from "jsonwebtoken";
import { auth, IRequest } from "./../../middleware/Auth";

const router = Router();
const authMiddleware = auth({ secret: process.env.JWT_SECRET });
const jsonParser = bodyParser.json();

export { router };
