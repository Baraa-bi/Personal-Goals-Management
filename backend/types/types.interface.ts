import { Bson } from "../deps.ts";
import { SetpStatus } from "../models/goal.model.ts";

export interface TokenStructure {
  access: { expires: Date; token: string };
  refresh: { expires: Date; token: string };
}

export interface UserStructure {
  id: string;
  email: string;
  fullname: string;
}

export interface GoalStructure {
  user_id: string;
  title: string;
  description: string;
  deadline: number;
  steps?: StepStructure[];
}

export interface StepStructure {
  title: string;
  description: string;
  status: SetpStatus;
  deadline: number;
}

export interface LoginStructure {
  tokens: TokenStructure | Error;
  user: UserStructure;
}

export interface CreateUserStructure {
  email: string;
  fullname: string;
  password: string;
}

export interface Err {
  status: number;
  name: string;
  path: string;
  param: string;
  message: string;
  type: string;
}

export interface JwtPayload {
  iss: string;
  iat: number;
  id: string;
  exp: number;
}
