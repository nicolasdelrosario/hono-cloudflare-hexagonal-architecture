import * as HttpStatusCodes from "@Shared/common/HttpStatusCodes";
import * as HttpStatusPhrases from "@Shared/common/HttpStatusPhrases";
import type { ServiceContainer } from "@Shared/infrastructure/ServiceContainer";
import type {
  Controller,
  Response,
} from "@Shared/infrastructure/controllers/Controller";
import { UserNotFoundError } from "@User/domain/exceptions/UserNotFoundError";
import type { Context, TypedResponse } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export class UserGetOneByEmailController implements Controller {
  async run(
    c: Context,
  ): Promise<Response & TypedResponse<Response, StatusCode, "json">> {
    try {
      const email = c.req.param("email");
      const services = c.get("services") as ServiceContainer;
      const user = await services.user.getOneByEmail.run(email);

      return c.json(
        { message: HttpStatusPhrases.OK, user: user.toPublicJSON() },
        HttpStatusCodes.OK,
      );
    } catch (error) {
      if (error instanceof UserNotFoundError)
        return c.json({ message: error.message }, HttpStatusCodes.NOT_FOUND);

      throw error;
    }
  }
}
