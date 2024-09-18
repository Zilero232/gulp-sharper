import { createLogger, type Logger, type LoggerOptions } from "winston";

import { createWinstonFormat, createTransportsOptions } from "@utils";

import { GulpWinstonErrorOptions } from "@types";

interface CreateWinstonLoggerProps {
  pluginName: string;
  options: GulpWinstonErrorOptions;
}

export const createWinstonLogger = ({ pluginName, options }: CreateWinstonLoggerProps): Logger => {
  const loggerOptions: LoggerOptions = {
    ...options,
    level: "error",
    format: createWinstonFormat({
      pluginName,
      options: {
        printf: true,
        ...options.format,
      },
    }),
    transports: createTransportsOptions({
      pluginName: pluginName,
      options: {
        console: true,
        ...options.transports,
      },
    }),
    exitOnError: true,
    silent: false,
  };

  return createLogger(loggerOptions);
};
