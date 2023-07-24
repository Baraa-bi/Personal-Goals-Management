import { Bson, Status } from "../deps.ts";
import { Goal } from "../models/goal.model.ts";
import type { GoalStructure } from "../types/types.interface.ts";
import log from "../middlewares/logger.middleware.ts";
import { throwError } from "../middlewares/errorHandler.middleware.ts";

class GoalService {
  public static async getUserGoals(user_id: string): Promise<GoalStructure[]> {
    const goals: GoalStructure[] = await Goal.find({ user_id }).toArray();
    return goals;
  }
  public static async getUserGoal(
    user_id: string,
    goal_id: string
  ): Promise<GoalStructure | undefined> {
    const goal: GoalStructure | undefined = await Goal.findOne({
      _id: new Bson.ObjectId(goal_id),
      user_id,
    });
    return goal;
  }
  public static async createUserGoal(
    goal: GoalStructure
  ): Promise<string | Bson.ObjectId | Error> {
    const newGoal: string | Bson.ObjectId = await Goal.insertOne(goal);
    return newGoal;
  }
  public static async updateUserGoal(goal_id: string, goal: GoalStructure) {
    const newGoal = await Goal.updateOne(
      { _id: new Bson.ObjectId(goal_id) },
      { $set: goal }
    );
    log.debug({ goal });
    log.debug({ newGoal });
    if (!newGoal) {
      log.error("Goal not found");
      return throwError({
        status: Status.NotFound,
        name: "NotFound",
        path: "goal",
        param: "goal",
        message: `Goal not found`,
        type: "NotFound",
      });
    }
    return goal;
  }

  public static async deleteGoal(goal_id: string) {
    const res = await Goal.delete({ _id: new Bson.ObjectId(goal_id) });
    return res;
  }
}

export default GoalService;
