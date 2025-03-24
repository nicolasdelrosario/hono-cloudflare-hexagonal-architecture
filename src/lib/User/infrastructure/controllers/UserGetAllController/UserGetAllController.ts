import * as HttpStatusCodes from "@Shared/common/HttpStatusCodes";
import * as HttpStatusPhrases from "@Shared/common/HttpStatusPhrases";
import type { ServiceContainer } from "@Shared/infrastructure/ServiceContainer";
import type {
  Controller,
  Response,
} from "@Shared/infrastructure/controllers/Controller";
import type { Context, TypedResponse } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export class UserGetAllController implements Controller {
  async run(
    c: Context,
  ): Promise<Response & TypedResponse<Response, StatusCode, "json">> {
    const services = c.get("services") as ServiceContainer;
    const users = await services.user.getAll.run();

    return c.json(
      {
        message: HttpStatusPhrases.OK,
        users: users.map((user) => user.toPublicJSON()),
      },
      HttpStatusCodes.OK,
    );
  }
}
