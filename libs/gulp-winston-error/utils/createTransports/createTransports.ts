import { transports } from "winston";
import type TransportStream from "winston-transport";
import path from "path";

import { createWinstonFormat } from "../";

import createTransportConfig from "../../helpers/createTransportConfig";

import type { TransportsOptions, ConsoleTransportOptions, FileTransportOptions, HttpTransportOptions, StreamTransportOptions } from "../../types";

interface CreateTransportsOptionsProps {
  pluginName: string;
  options: TransportsOptions;
}

export const createTransportsOptions = ({ pluginName, options }: CreateTransportsOptionsProps): TransportStream[] => {
  const transportsOptions: TransportStream[] = [];

  if (options?.console) {
    const defaultConsoleOptions: ConsoleTransportOptions = {
      format: createWinstonFormat({
        pluginName,
        options: {},
      }),
    };

    transportsOptions.push(
      new transports.Console(
        createTransportConfig({
          pluginName,
          options: options.console,
          defaultOptions: defaultConsoleOptions,
        })
      )
    );
  }

  if (options?.file) {
    const defaultFileOptions: FileTransportOptions = {
      level: "info",
      filename: path.resolve("gulp-winston-errors.log"),
      format: createWinstonFormat({
        pluginName,
        options: {
          json: true,
        },
      }),
    };

    transportsOptions.push(
      new transports.File(
        createTransportConfig({
          pluginName,
          options: options.file,
          defaultOptions: defaultFileOptions,
        })
      )
    );
  }

  if (options?.http) {
    const defaultHttpOptions: HttpTransportOptions = {
      host: "localhost",
      path: "/log",
      format: createWinstonFormat({
        pluginName,
        options: {},
      }),
    };

    transportsOptions.push(
      new transports.Http(
        createTransportConfig({
          pluginName,
          options: options.http,
          defaultOptions: defaultHttpOptions,
        })
      )
    );
  }

  if (options?.stream) {
    const defaultStreamOptions: StreamTransportOptions = {
      stream: process.stdout,
      format: createWinstonFormat({
        pluginName,
        options: {
          simple: true,
        },
      }),
    };

    transportsOptions.push(
      new transports.Stream(
        createTransportConfig({
          pluginName,
          options: options.stream,
          defaultOptions: defaultStreamOptions,
        })
      )
    );
  }

  return transportsOptions;
};
