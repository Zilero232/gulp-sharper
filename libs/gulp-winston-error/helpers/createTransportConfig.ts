import { createWinstonFormat } from "@utils";

import { isBoolean, isObject } from "@helpers/typeHelpers";

interface TransportOptions {
  format?: unknown;
}

const createTransportConfig = <T extends TransportOptions>(options: boolean | T, defaultOptions: T): T => {
  if (isBoolean(options)) {
    return defaultOptions;
  }

  const { format, ...restOptions } = options as T;

  const combinedFormat = format
    ? createWinstonFormat({
        ...(isObject(defaultOptions.format) ? defaultOptions.format : {}),
        ...(isObject(format) ? format : {}),
      })
    : defaultOptions.format;

  return {
    ...defaultOptions,
    ...restOptions,
    format: combinedFormat,
  } as T;
};

export default createTransportConfig;
