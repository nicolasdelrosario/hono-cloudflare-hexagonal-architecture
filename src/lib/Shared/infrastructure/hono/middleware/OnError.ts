import type { ErrorHandler } from "hono";
import type { ContentfulStatusCode, StatusCode } from "hono/utils/http-status";

import * as HttpStatusCodes from "@/lib/Shared/common/HttpStatusCodes";

export const OnError: ErrorHandler = (err, c) => {
  const currentStatus =
    "status" in err ? (err.status as StatusCode) : c.res.status;

  const statusCode =
    currentStatus !== HttpStatusCodes.OK
      ? currentStatus
      : HttpStatusCodes.INTERNAL_SERVER_ERROR;

  // only show stack trace in development
  const isProd = c.env && c.env.ENV === "production";

  return c.json(
    {
      message: err.message,
      stack: isProd ? undefined : err.stack,
    },
    statusCode as ContentfulStatusCode,
  );
};
