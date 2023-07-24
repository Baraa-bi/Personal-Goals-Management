import { Status } from "../deps.ts";
import HashHelper from "../helpers/hash.helper.ts";
import { throwError } from "../middlewares/errorHandler.middleware.ts";
import type { TokenSchema } from "../models/token.model.ts";
import { User, UserSchema } from "../models/user.model.ts";
import type {
  LoginStructure,
  TokenStructure,
  UserStructure,
} from "../types/types.interface.ts";
import TokenService from "./token.service.ts";
import UserService from "./user.service.ts";

class AuthService {
  public static async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<LoginStructure | Error> {
    const user: UserSchema | undefined = await User.findOne({ email });
    if (
      user &&
      user.password &&
      (await HashHelper.compare(password, user.password))
    ) {
      const { _id, fullname, email }: UserSchema = user;
      const tokens: TokenStructure | Error =
        await TokenService.generateAuthTokensService(_id.toString());
      return {
        tokens,
        user: { id: _id.toString(), fullname, email },
      };
    }
    return throwError({
      status: Status.Unauthorized,
      name: "Unauthorized",
      path: "password",
      param: "password",
      message: `email or password is not correct`,
      type: "Unauthorized",
    });
  }

  /**
   * Get Refresh token service
   * @param token
   * @returns Promise<TokenStructure | Error> returns Tokens
   */
  public static async getRefreshToken(
    token: string
  ): Promise<TokenStructure | Error> {
    const refreshTokenDoc: TokenSchema | Error =
      await TokenService.verifyTokenService(token, "refresh");
    if ("user" in refreshTokenDoc) {
      const userId = refreshTokenDoc.user;
      const user: UserStructure | Error = await UserService.getUser(userId);
      await TokenService.removeExistingRefreshToken(
        refreshTokenDoc?._id?.toString()
      );
      return await TokenService.generateRefreshTokensService(
        "id" in user ? user.id : undefined
      );
    }
    return throwError({
      status: Status.BadRequest,
      name: "BadRequest",
      path: "refresh_token",
      param: "refresh_token",
      message: `refresh_token is invalid`,
      type: "BadRequest",
    });
  }
}

export default AuthService;
