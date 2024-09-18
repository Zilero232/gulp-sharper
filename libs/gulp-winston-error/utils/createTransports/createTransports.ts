import { transports } from "winston";
import type Transport from "winston-transport";

import { createWinstonFormat } from "@utils";

import createTransportConfig from "@helpers/createTransportConfig";

import type { TransportsOptions, ConsoleTransportOptions, FileTransportOptions, HttpTransportOptions, StreamTransportOptions } from "@types";

interface CreateTransportsOptionsProps {
  pluginName: string;
  options: TransportsOptions;
}

export const createTransportsOptions = ({ pluginName, options }: CreateTransportsOptionsProps): Transport[] => {
  const transportsOptions: Transport[] = [];

  if (options?.console) {
    const defaultConsoleOptions: ConsoleTransportOptions = {
      format: createWinstonFormat({
        pluginName,
        options: {
          printf: true,
          timestamp: true,
          colorize: true,
        },
      }),
    };

    transportsOptions.push(
      new transports.Console(
        createTransportConfig<ConsoleTransportOptions>({
          pluginName,
          options: options.console,
          defaultOptions: defaultConsoleOptions,
        })
      )
    );
  }

  if (options?.file) {
    const defaultFileOptions: FileTransportOptions = {
      filename: "application.log",
      format: createWinstonFormat({
        pluginName,
        options: {
          printf: true,
          timestamp: true,
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
        options: {
          printf: true,
          timestamp: true,
        },
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
          printf: true,
          timestamp: true,
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
