import { transports } from "winston";
import type Transport from "winston-transport";

import { createWinstonFormat } from "@utils";

import createTransportConfig from "@helpers/createTransportConfig";

import type { GulpWinstonErrorOptions, ConsoleTransportOptions, FileTransportOptions, HttpTransportOptions, StreamTransportOptions } from "@types";

export const createTransportsOptions = (options: GulpWinstonErrorOptions): Transport[] => {
  const transportsOptions: Transport[] = [];

  if (options.transports?.console) {
    const defaultConsoleOptions: ConsoleTransportOptions = {
      format: createWinstonFormat({
        timestamp: true,
        colorize: true,
      }),
    };

    transportsOptions.push(new transports.Console(createTransportConfig(options.transports.console, defaultConsoleOptions)));
  }

  if (options.transports?.file) {
    const defaultFileOptions: FileTransportOptions = {
      filename: "application.log",
      format: createWinstonFormat({
        timestamp: true,
        json: true,
      }),
    };

    transportsOptions.push(new transports.File(createTransportConfig(options.transports.file, defaultFileOptions)));
  }

  if (options.transports?.http) {
    const defaultHttpOptions: HttpTransportOptions = {
      host: "localhost",
      path: "/log",
      format: createWinstonFormat({
        timestamp: true,
      }),
    };

    transportsOptions.push(new transports.Http(createTransportConfig(options.transports.http, defaultHttpOptions)));
  }

  if (options.transports?.stream) {
    const defaultStreamOptions: StreamTransportOptions = {
      stream: process.stdout,
      format: createWinstonFormat({
        timestamp: true,
        simple: true,
      }),
    };

    transportsOptions.push(new transports.Stream(createTransportConfig(options.transports.stream, defaultStreamOptions)));
  }

  return transportsOptions;
};
