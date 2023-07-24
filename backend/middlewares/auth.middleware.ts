import { RouterMiddleware, Status } from "../deps.ts";
import type { RouterContext } from "../deps.ts";
import JwtHelper from "../helpers/jwt.helper.ts";
import UserService from "../services/user.service.ts";
import type { UserStructure } from "../types/types.interface.ts";
import { throwError } from "./errorHandler.middleware.ts";

export const auth =
  <Path extends string>(): RouterMiddleware<Path> =>
  async (
    ctx: RouterContext<Path>,
    next: () => Promise<unknown>
  ): Promise<void> => {
    let JWT: string;
    const jwt: string = ctx.request.headers.get("Authorization")
      ? ctx.request.headers.get("Authorization")!
      : "";
    if (jwt && jwt.includes("Bearer")) {
      JWT = jwt.split("Bearer ")[1];
      // deno-lint-ignore no-explicit-any
      const data: any | Error = await JwtHelper.getJwtPayload(JWT);
      if (data) {
        const user: UserStructure | Error = await UserService.getUser(data.id);
        if (user) ctx.state = user;
      } else {
        throwError({
          status: Status.Unauthorized,
          name: "Unauthorized",
          path: `access_token`,
          param: `access_token`,
          message: `access_token is invalid`,
          type: "Unauthorized",
        });
      }
    } else {
      throwError({
        status: Status.Unauthorized,
        name: "Unauthorized",
        path: `access_token`,
        param: `access_token`,
        message: `access_token is required`,
        type: "Unauthorized",
      });
    }
    await next();
  };
