import { Application, Request, Response } from "express";
import * as express from "express";
import { logging } from "./logger/logManager";

const logger = logging.getLogger("core");
const PORT = 8000;

export const init = () => {
  logging
    .configure({
      minLevels: {
        "": "info",
        core: "warn"
      }
    })
    .registerConsoleLogger();

  // rest of the code remains same
  const app: Application = express();


  // Body parsing Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get(
    "/",
    async (req: Request, res: Response): Promise<Response> => {
      return res.status(200).send({
        message: "Hello World!"
      });
    }
  );

  try {
    app.listen(PORT, (): void => {
      logger.info(`Connected successfully on port ${PORT}`);
    });
  } catch (error) {
    logger.info(`Error occured: ${error}`);
  }
};

export const start = () => {
  init();
};

start();
