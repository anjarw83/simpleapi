import { Application, Request, Response } from "express";
import * as express from "express";
import * as session from "express-session"
import { logging } from "./logger/logManager";
import routes from "./routes/routes";
import * as passport from "passport";

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
  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: "SECRET"
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(routes);

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
