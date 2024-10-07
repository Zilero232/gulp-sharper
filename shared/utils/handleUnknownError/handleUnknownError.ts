import GulpWinstonError from "@zilero/gulp-winston-error";

interface HandleUnknownError {
  pluginName: string;
  message?: string;
  error: Error | unknown;
}

/**
 * Handles an unknown error by passing it to the GulpWinstonError plugin
 * for logging and error handling. If the error is not an instance of the
 * Error class, a generic error message is logged.
 */
export function handleUnknownError({ pluginName, message, error }: HandleUnknownError): void {
  if (error instanceof Error) {
    GulpWinstonError({
      pluginName,
      message,
      error,
    });
  } else {
    GulpWinstonError({
      pluginName,
      message: "An unknown error occurred",
    });
  }
}
