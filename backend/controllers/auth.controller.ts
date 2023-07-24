import { RouterContext, Status } from "../deps.ts";
import log from "../middlewares/logger.middleware.ts";
import AuthService from "../services/auth.service.ts";
import UserService from "../services/user.service.ts";

class AuthController {
  public static async login({
    request,
    response,
  }: RouterContext<string>): Promise<void> {
    const body = request.body();
    const { email, password } = await body.value;
    log.debug("Trying Login user");
    response.body = await AuthService.login({ email, password });
  }

  public static async refreshTokens({
    request,
    response,
  }: RouterContext<string>): Promise<void> {
    const body = request.body();
    const { refreshToken } = await body.value;
    log.debug("Getting refresh token");
    response.body = await AuthService.getRefreshToken(refreshToken);
  }

  public static async register({
    request,
    response,
  }: RouterContext<string>): Promise<void> {
    const body = request.body();
    const { fullname, password, email } = await body.value;
    response.body = await UserService.createUser({ fullname, email, password });
    response.status = Status.Created;
  }

  public static me({ state, response }: RouterContext<string>): void {
    response.body = state;
  }
}

export default AuthController;
