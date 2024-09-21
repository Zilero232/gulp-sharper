import { InvalidFormatError } from "../../utils";

import { isBoolean, isString } from "../../helpers/typeHelpers";

import { TimestampFormat } from "../../types";

const formatMapping: Record<TimestampFormat, string> = {
  FULL_DATE: "YYYY-MM-DD HH:mm:ss",
  DATE_ONLY: "YYYY-MM-DD",
  TIME_ONLY: "HH:mm:ss",
  SHORT: "DD/MM/YYYY HH:mm",
  ISO: "YYYY-MM-DDTHH:mm:ss.SSSZ",
  UNIX: "X",
};

interface GetTimestampFormat {
  timestampOption: TimestampFormat | string;
}

export const getTimestampFormat = ({ timestampOption }: GetTimestampFormat) => {
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
