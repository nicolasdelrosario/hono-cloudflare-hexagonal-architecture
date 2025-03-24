import * as HttpStatusCodes from "@Shared/common/HttpStatusCodes";
import * as HttpStatusPhrases from "@Shared/common/HttpStatusPhrases";
import type { ServiceContainer } from "@Shared/infrastructure/ServiceContainer";
import type {
  Controller,
  Response,
} from "@Shared/infrastructure/controllers/Controller";
import { InvalidUserDataError } from "@User/domain/exceptions/InvalidUserDataError";
import { UserNotFoundError } from "@User/domain/exceptions/UserNotFoundError";
import type { Context, TypedResponse } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export class UserEditController implements Controller {
  async run(
    c: Context,
  ): Promise<Response & TypedResponse<Response, StatusCode, "json">> {
    try {
      const id = c.req.param("id");
      const body = await c.req.json();
      const { name, email } = body;

      const services = c.get("services") as ServiceContainer;
      await services.user.edit.run(id, name, email);

      return c.json({ message: HttpStatusPhrases.OK }, HttpStatusCodes.OK);
    } catch (error) {
      if (error instanceof UserNotFoundError)
        return c.json({ message: error.message }, HttpStatusCodes.NOT_FOUND);

      if (error instanceof InvalidUserDataError)
        return c.json({ message: error.message }, HttpStatusCodes.BAD_REQUEST);

      throw error;
    }
  }
}
