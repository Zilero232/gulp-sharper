import GulpWinstonError from "@zilero/gulp-winston-error";

interface HandleUnknownError {
  pluginName: string;
  error: Error | unknown;
}

export function handleUnknownError({ pluginName, error }: HandleUnknownError): void {
  if (error instanceof Error) {
    GulpWinstonError({
      pluginName,
      error,
    });
  } else {
    GulpWinstonError({
      pluginName,
      message: "An unknown error occurred",
    });
  }
}
