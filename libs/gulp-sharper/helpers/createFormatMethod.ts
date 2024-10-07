import { InvalidFormatError } from "@shared/utils";
import { isObject } from "@shared/helpers/typeHelpers";

import { InitialSharp, FormatOptions, SupportedFormatMethod } from "../types";

interface MainFormat<T extends SupportedFormatMethod> {
  pipeline: InitialSharp;
  options: FormatOptions[T];
  method: T;
}

/**
 * Applies a format to the sharp pipeline.
 *
 * This function takes a pipeline, a format name and its options, and applies the
 * format to the pipeline. If the options are not an object, it throws an
 * InvalidFormatError.
 *
 * @returns {InitialSharp} - The modified sharp pipeline.
 */
const createFormatMethod = <T extends SupportedFormatMethod>({ pipeline, options, method }: MainFormat<T>): InitialSharp => {
  if (isObject(options)) {
    return (pipeline[method] as (opts: FormatOptions[T]) => InitialSharp)(options);
  }

  throw new InvalidFormatError({
    fieldName: "createSharpMethod",
    receivedValue: options,
    expectedType: "object",
  });
};

export default createFormatMethod;
