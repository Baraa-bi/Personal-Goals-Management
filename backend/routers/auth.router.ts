import AuthController from "../controllers/auth.controller.ts";
import { Router } from "../deps.ts";
import { auth } from "../middlewares/auth.middleware.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import {
  loginValidation,
  refreshTokenValidation,
} from "../validators/auth.validation.ts";
import { createUserValidation } from "../validators/user.validation.ts";
const router = new Router();

router.post("/api/auth/login", validate(loginValidation), AuthController.login);
router.post(
  "/api/auth/register",
  validate(createUserValidation),
  AuthController.register
);

router.post(
  "/api/auth/refresh-tokens",
  validate(refreshTokenValidation),
  AuthController.refreshTokens
);

router.get("/api/auth/me", auth(), AuthController.me);

export default router;
