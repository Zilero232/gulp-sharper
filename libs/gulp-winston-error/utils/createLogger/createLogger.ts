import { createLogger, type Logger, type LoggerOptions } from "winston";
import chalk from "chalk";

import { createWinstonFormat, createTransportsOptions } from "../";

import { GulpWinstonErrorOptions } from "../../types";

interface CreateWinstonLoggerProps {
  pluginName: string;
  options: GulpWinstonErrorOptions;
}

export const createWinstonLogger = ({ pluginName, options }: CreateWinstonLoggerProps): Logger => {
  const transports = createTransportsOptions({
    pluginName: pluginName,
    options: {
      console: true,
      ...options.transports,
    },
  });

  if (!transports.length) {
    throw new Error(`${chalk.red("Error:")} ${chalk.yellow("You have not transferred any transport,")} ${chalk.cyan("check the config.")}`);
  }

  const loggerOptions: LoggerOptions = {
    ...options,
    level: "error",
    format: createWinstonFormat({
      pluginName,
      options: {
        printf: true,
        colorize: true,
        timestamp: {
          format: "DATE_ONLY",
        },
        ...options.format,
      },
    }),
    transports,
    exitOnError: true,
    silent: false,
  };

  return createLogger(loggerOptions);
};
