import { createLogger, type Logger, type LoggerOptions } from "winston";

import { createWinstonFormat, createTransportsOptions } from "@utils";

import { GulpWinstonErrorOptions } from "@types";

export const createWinstonLogger = (options: GulpWinstonErrorOptions): Logger => {
  const loggerOptions: LoggerOptions = {
    ...options,
    level: "info",
    format: createWinstonFormat(options.format),
    transports: createTransportsOptions(options),
    exitOnError: false,
    silent: false,
  };

  return createLogger(loggerOptions);
};
