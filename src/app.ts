import { createApp } from "@/lib/Shared/infrastructure/hono/CreateApp";
import { registerRoutes } from "@/lib/Shared/infrastructure/routes";

const app = createApp();

registerRoutes(app);

export { app };
