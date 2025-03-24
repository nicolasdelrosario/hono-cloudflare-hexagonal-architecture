import * as AuthRoutes from "@Auth/infrastructure/routes/HonoAuthRoutes";
import type { Env } from "@Shared/common/Types";
import * as UserRoutes from "@User/infrastructure/routes/HonoUserRoutes";
import type { Hono } from "hono";

const routes = [UserRoutes, AuthRoutes];

export function registerRoutes(app: Hono<Env>): void {
  for (const route of routes) {
    route.register(app);
  }
}
