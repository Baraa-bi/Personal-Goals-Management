import type { RouterContext } from "../deps.ts";
import { Status } from "../deps.ts";
import GoalService from "../services/goal.service.ts";

class GoalController {
  public static async getAllGoals({ state, response }: RouterContext<string>) {
    response.body = await GoalService.getUserGoals(state.id);
    response.status = Status.OK;
  }
  public static async createGoal({
    state,
    request,
    response,
  }: RouterContext<string>) {
    const body = request.body();
    const { title, description, deadline, steps } = await body.value;
    response.body = await GoalService.createUserGoal({
      user_id: state.id,
      title,
      description,
      deadline,
      steps,
    });
    response.status = Status.Created;
  }

  public static async getGoal({
    state,
    params,
    response,
  }: RouterContext<string>): Promise<void> {
    const goal_id = params.goal_id;
    if (!goal_id) {
      response.body = "goal id is required";
      response.status = Status.BadRequest;
      return;
    }
    response.body = await GoalService.getUserGoal(state.id, goal_id);
    response.status = Status.OK;
  }
  public static async updateGoal({
    state,
    request,
    params,
    response,
  }: RouterContext<string>): Promise<void> {
    const body = request.body();
    const goal_id = params.goal_id;
    if (!goal_id) {
      response.body = "goal id is required";
      response.status = Status.BadRequest;
      return;
    }
    const { title, description, steps, deadline } = await body.value;
    response.body = await GoalService.updateUserGoal(goal_id, {
      user_id: state.id,
      title,
      description,
      deadline,
      steps,
    });
    response.status = Status.Created;
  }
  public static async deleteGoal({
    params,
    response,
  }: RouterContext<string>): Promise<void> {
    const goal_id = params.goal_id;
    if (!goal_id) {
      response.body = "goal id is required";
      response.status = Status.BadRequest;
      return;
    }
    response.body = { response: await GoalService.deleteGoal(goal_id) };
    response.status = Status.OK;
  }
}

export default GoalController;
