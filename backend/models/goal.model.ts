import db from "../db/db.ts";

export enum SetpStatus {
  COMPLETED = "completed",
  IN_PROGRESS = "in-progress",
  NOT_STARTED = "not-started",
}

export interface StepSchema {
  title: string;
  description: string;
  status: SetpStatus;
  deadline: number;
}

export interface GoalSchema {
  _id: string;
  user_id: string;
  title: string;
  description: string;
  deadline: number;
  steps?: StepSchema[];
}

export const Goal = db.getDatabase.collection<GoalSchema>("goals");
