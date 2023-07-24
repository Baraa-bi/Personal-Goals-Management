import type { Application } from "../deps.ts";
import defaultRouter from "./default.router.ts";
import goalRouter from "./goal.router.ts";
import authRouter from "./auth.router.ts";

const init = (app: Application) => {
  app.use(authRouter.routes());
  app.use(goalRouter.routes());
  app.use(defaultRouter.routes());

  app.use(authRouter.allowedMethods());
  app.use(goalRouter.allowedMethods());
  app.use(defaultRouter.allowedMethods());
};

export default { init };
