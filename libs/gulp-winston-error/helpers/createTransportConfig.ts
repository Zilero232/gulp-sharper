import { createWinstonFormat } from "../utils";

import { isBoolean, isObject } from "../helpers/typeHelpers";

interface TransportOptions {
  format?: unknown;
}

interface CreateTransportConfigProps<T> {
  pluginName: string;
  options: boolean | T;
  defaultOptions: T;
}

const createTransportConfig = <T extends TransportOptions>({ pluginName, options, defaultOptions }: CreateTransportConfigProps<T>): T => {
  if (isBoolean(options)) {
    return defaultOptions;
  }

  const { format, ...restOptions } = options as T;

  const combinedFormat = format
    ? createWinstonFormat({
        pluginName,
        options: {
          ...(isObject(defaultOptions.format) ? defaultOptions.format : {}),
          ...(isObject(format) ? format : {}),
        },
      })
    : defaultOptions.format;

  return {
    ...defaultOptions,
    ...restOptions,
    format: combinedFormat,
  } as T;
};

export default createTransportConfig;
