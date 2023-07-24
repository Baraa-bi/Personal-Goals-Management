import db from "../db/db.ts";

export interface UserSchema {
  _id: string;
  email: string;
  fullname: string;
  password: string;
}

export const User = db.getDatabase.collection<UserSchema>("users");
