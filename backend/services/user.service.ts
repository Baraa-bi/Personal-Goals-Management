import { Bson, Status } from "../deps.ts";
import HashHelper from "../helpers/hash.helper.ts";
import { throwError } from "../middlewares/errorHandler.middleware.ts";
import log from "../middlewares/logger.middleware.ts";
import { User, UserSchema } from "../models/user.model.ts";
import type {
  CreateUserStructure,
  UserStructure,
} from "../types/types.interface.ts";

class UserService {
  public static async createUser(
    options: CreateUserStructure
  ): Promise<string | Bson.ObjectId | Error> {
    const { fullname, email, password } = options;
    const userExists: UserSchema | undefined = await User.findOne({ email });
    if (userExists) {
      log.error("User already exists");
      return throwError({
        status: Status.Conflict,
        name: "Conflict",
        path: "user",
        param: "user",
        message: `User already exists`,
        type: "Conflict",
      });
    }
    const hashedPassword = await HashHelper.encrypt(password);

    const user: string | Bson.ObjectId = await User.insertOne({
      fullname,
      email,
      password: hashedPassword,
    });

    return user;
  }

  public static async getUser(id: string): Promise<UserStructure | Error> {
    const user: UserSchema | undefined = await User.findOne({
      _id: new Bson.ObjectId(id),
    });
    if (!user) {
      log.error("User not found");
      return throwError({
        status: Status.NotFound,
        name: "NotFound",
        path: "user",
        param: "user",
        message: `User not found`,
        type: "NotFound",
      });
    }
    const { fullname, email } = user;
    return { id, fullname, email };
  }
}

export default UserService;
