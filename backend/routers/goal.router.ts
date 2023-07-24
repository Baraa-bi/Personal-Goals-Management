import { compose } from "https://deno.land/x/oak@v11.1.0/middleware.ts";
import GoalController from "../controllers/goal.controller.ts";
import { Router } from "../deps.ts";
import { auth } from "../middlewares/auth.middleware.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import { goalValidation } from "../validators/goal.validation.ts";

const router = new Router();

router.get("/api/goals", auth(), GoalController.getAllGoals);
router.post(
  "/api/goals",
  compose([validate(goalValidation), auth()]),
  GoalController.createGoal
);
router.get("/api/goals/:goal_id", auth(), GoalController.getGoal);
router.put(
  "/api/goals/:goal_id",
  compose([validate(goalValidation), auth()]),
  GoalController.updateGoal
);
router.delete("/api/goals/:goal_id", auth(), GoalController.deleteGoal);

export default router;
