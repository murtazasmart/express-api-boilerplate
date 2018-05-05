import { Container } from "inversify";
import "reflect-metadata";

import { Logger } from "./util/Logger";

const GlobalDI = new Container();

GlobalDI.bind<Logger>("Logger").to(Logger).inSingletonScope();

export { GlobalDI };
