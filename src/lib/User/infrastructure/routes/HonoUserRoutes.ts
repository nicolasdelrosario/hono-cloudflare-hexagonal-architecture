import type { Env } from "@Shared/common/Types";
import { UserCreateController } from "@User/infrastructure/controllers/UserCreateController/UserCreateController";
import { UserDeleteController } from "@User/infrastructure/controllers/UserDeleteController/UserDeleteController";
import { UserEditController } from "@User/infrastructure/controllers/UserEditController/UserEditController";
import { UserGetAllController } from "@User/infrastructure/controllers/UserGetAllController/UserGetAllController";
import { UserGetCurrentController } from "@User/infrastructure/controllers/UserGetCurrentController/UserGetCurrentController";
import { UserGetOneByIdController } from "@User/infrastructure/controllers/UserGetOneByIdController/UserGetOneByIdController";
import {
  CreateUserSchema,
  EditUserSchema,
  UserIdParamSchema,
} from "@User/infrastructure/schemas/UserSchema";
import { zValidator } from "@hono/zod-validator";
import type { Hono } from "hono";

const userGetAllController = new UserGetAllController();
const userGetOneByIdController = new UserGetOneByIdController();
const userGetCurrentController = new UserGetCurrentController();
const userCreateController = new UserCreateController();
const userEditController = new UserEditController();
const userDeleteController = new UserDeleteController();

export const register = (app: Hono<Env>): void => {
  app.get("/users", (c) => userGetAllController.run(c));
  app.get("/users/:id", zValidator("param", UserIdParamSchema), (c) =>
    userGetOneByIdController.run(c),
  );
  app.get("/me", (c) => userGetCurrentController.run(c));
  app.post("/users", zValidator("json", CreateUserSchema), (c) =>
    userCreateController.run(c),
  );
  app.put(
    "/users/:id",
    zValidator("param", UserIdParamSchema),
    zValidator("json", EditUserSchema),
    (c) => userEditController.run(c),
  );
  app.delete("/users/:id", zValidator("param", UserIdParamSchema), (c) =>
    userDeleteController.run(c),
  );
};
