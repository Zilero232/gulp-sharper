import { InvalidFormatError } from "@shared/utils";
import { isObject } from "@shared/helpers/typeHelpers";

import createFormat from "../../helpers/createFormatMethod";

import { InitialSharp, GulpSharperOptions, SupportedFormatMethod } from "../../types";

interface CreateSharpFormatsProps {
  pipeline: InitialSharp;
  formats: GulpSharperOptions["formats"];
}

/**
 * Applies formats to the sharp pipeline.
 *
 * This function takes a formats object and applies each format to the pipeline.
 * If the formats object is empty, it returns the pipeline immediately.
 *
 * @returns {InitialSharp} - The modified sharp pipeline.
 */
export function createSharpFormats({ pipeline, formats }: CreateSharpFormatsProps): InitialSharp {
  if (!formats) {
    return pipeline;
  }

  if (!isObject(formats)) {
    throw new InvalidFormatError({
      fieldName: "CreateSharpFormats",
      receivedValue: formats,
      expectedType: "FormatOptions",
    });
  }

  // Through each format and call the appropriate processing.
  (Object.keys(formats) as SupportedFormatMethod[]).forEach((format) => {
    const options = formats[format];

    if (options) {
      createFormat({
        pipeline,
        options,
        method: format, // Dynamically passing the format as a method.
      });
    }
  });

  return pipeline;
}
