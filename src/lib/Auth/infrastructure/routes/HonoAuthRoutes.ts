import type { Env } from "@/lib/Shared/common/Types";
import { LoginController } from "@Auth/infrastructure/controllers/LoginController";
import { LogoutController } from "@Auth/infrastructure/controllers/LogoutController";
import { RefreshTokenController } from "@Auth/infrastructure/controllers/RefreshTokenController";
import type { Hono } from "hono";

const loginController = new LoginController();
const logoutController = new LogoutController();
const refreshTokenController = new RefreshTokenController();

export const register = (app: Hono<Env>) => {
  app.post("/login", (c) => loginController.run(c));
  app.post("/logout", (c) => logoutController.run(c));
  app.post("/refresh-token", (c) => refreshTokenController.run(c));
};
