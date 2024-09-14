import { InvalidFormatError } from "@utils";

import { isBoolean, isString } from "@helpers/typeHelpers";

import { FormatOptions, TimestampFormat } from "@types";

const formatMapping: Record<TimestampFormat, string> = {
  FULL_DATE: "YYYY-MM-DD HH:mm:ss",
  SHORT: "DD/MM/YYYY HH:mm",
  TIME_ONLY: "HH:mm:ss",
  DATE_ONLY: "YYYY-MM-DD",
  ISO: "YYYY-MM-DDTHH:mm:ss.SSSZ",
  UNIX: "X",
};

export const getTimestampFormat = (timestampOption?: FormatOptions["timestamp"]) => {
  if (isBoolean(timestampOption)) {
    return formatMapping.FULL_DATE;
  }

  if (isString(timestampOption)) {
    return formatMapping[timestampOption as TimestampFormat] || timestampOption;
  }

  throw new InvalidFormatError({
    fieldName: "align",
    expectedType: "boolean or TimestampFormat",
    receivedValue: timestampOption,
  });
};
