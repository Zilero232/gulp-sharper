import { format as winstonFormat, Logform as logform } from "winston";

import { InvalidFormatError, getTimestampFormat } from "@utils";

import { isBoolean, isFunction, isObject, isString } from "@helpers/typeHelpers";

import { FormatOptions, ColorizeOptions } from "@types";

export function createAlignFormat(AlignOption: FormatOptions["align"]): logform.Format {
  if (isBoolean(AlignOption)) {
    return winstonFormat.align();
  }

  throw new InvalidFormatError({
    fieldName: "align",
    expectedType: "boolean",
    receivedValue: AlignOption,
  });
}

export function createCliFormat(CliOption: FormatOptions["cli"]): logform.Format {
  if (isBoolean(CliOption)) {
    return winstonFormat.cli();
  }

  if (isObject(CliOption)) {
    return winstonFormat.cli(CliOption);
  }

  throw new InvalidFormatError({
    fieldName: "cli",
    expectedType: "boolean or CliOptions",
    receivedValue: CliOption,
  });
}

export function createColorizeFormat(colorizeOption: FormatOptions["colorize"]): logform.Format {
  const defaultColorizeOption: ColorizeOptions = {
    colors: {
      error: "red",
      warn: "yellow",
      info: "green",
      http: "magenta",
      verbose: "cyan",
      debug: "blue",
      silly: "gray",
    },
  };

  if (isBoolean(colorizeOption)) {
    return winstonFormat.colorize(defaultColorizeOption);
  }

  if (isObject(colorizeOption)) {
    return winstonFormat.colorize(colorizeOption);
  }

  throw new InvalidFormatError({
    fieldName: "colorize",
    expectedType: "boolean or ColorizeOptions",
    receivedValue: colorizeOption,
  });
}

export function createErrorsFormat(errorsOption: FormatOptions["errors"]): logform.Format {
  if (isBoolean(errorsOption)) {
    return winstonFormat.errors({ stack: false });
  }

  if (isObject(errorsOption)) {
    return winstonFormat.errors(errorsOption);
  }

  throw new InvalidFormatError({
    fieldName: "errors",
    expectedType: "boolean or errorsOption",
    receivedValue: errorsOption,
  });
}

export function createJsonFormat(jsonOption: FormatOptions["json"]): logform.Format {
  if (isBoolean(jsonOption)) {
    return winstonFormat.json();
  }

  if (isObject(jsonOption)) {
    return winstonFormat.json(jsonOption);
  }

  throw new InvalidFormatError({
    fieldName: "json",
    expectedType: "boolean or JsonOptions",
    receivedValue: jsonOption,
  });
}

export function createLabelFormat(labelOption: FormatOptions["label"]): logform.Format {
  if (isString(labelOption)) {
    return winstonFormat.label({ label: labelOption });
  }

  if (isObject(labelOption)) {
    return winstonFormat.label(labelOption);
  }

  throw new InvalidFormatError({
    fieldName: "label",
    expectedType: "string or LabelOptions",
    receivedValue: labelOption,
  });
}

export function createLogstashFormat(LogstashOption: FormatOptions["logstash"]): logform.Format {
  if (isBoolean(LogstashOption)) {
    return winstonFormat.logstash();
  }

  throw new InvalidFormatError({
    fieldName: "logstash",
    expectedType: "boolean",
    receivedValue: LogstashOption,
  });
}

export function createMetadataFormat(metadataOption: FormatOptions["metadata"]): logform.Format {
  if (isBoolean(metadataOption)) {
    return winstonFormat.metadata();
  }

  if (isObject(metadataOption)) {
    return winstonFormat.metadata(metadataOption);
  }

  throw new InvalidFormatError({
    fieldName: "metadata",
    expectedType: "boolean or MetadataOptions",
    receivedValue: metadataOption,
  });
}

export function createMsFormat(MsOption: FormatOptions["ms"]): logform.Format {
  if (isBoolean(MsOption)) {
    return winstonFormat.ms();
  }

  throw new InvalidFormatError({
    fieldName: "ms",
    expectedType: "boolean",
    receivedValue: MsOption,
  });
}

export function createPadLevelsFormat(padLevelsOption: FormatOptions["padLevels"]): logform.Format {
  if (isBoolean(padLevelsOption)) {
    return winstonFormat.padLevels();
  }

  if (isObject(padLevelsOption)) {
    return winstonFormat.padLevels(padLevelsOption);
  }

  throw new InvalidFormatError({
    fieldName: "padLevels",
    expectedType: "boolean or PadLevelsOptions",
    receivedValue: padLevelsOption,
  });
}

export function createPrettyPrintFormat(prettyPrintOption: FormatOptions["prettyPrint"]): logform.Format {
  if (isBoolean(prettyPrintOption)) {
    return winstonFormat.prettyPrint();
  }

  if (isObject(prettyPrintOption)) {
    return winstonFormat.prettyPrint(prettyPrintOption);
  }

  throw new InvalidFormatError({
    fieldName: "prettyPrint",
    expectedType: "boolean or PrettyPrintOptions",
    receivedValue: prettyPrintOption,
  });
}

export function createPrintfFormat(pluginName: string, printfOption: FormatOptions["printf"]): logform.Format {
  if (isBoolean(printfOption)) {
    return winstonFormat.printf(({ timestamp, level, message, stack, ...meta }) => {
      let logOutput = "";

      // If the timestamp is passed, add it before the rest of the fields.
      if (timestamp) {
        logOutput = `${timestamp} `;
      }

      // If there is an error stack, add it after the message.
      if (stack) {
        logOutput += `\nStack: ${stack}`;
      }

      logOutput += `[${level}] Plugin: ${pluginName} - ${message}`;

      // Processing the rest of the metadata.
      Object.entries(meta).forEach(([key, value]) => {
        switch (value) {
          case isBoolean(value):
            // For Boolean values, we show true/false.
            logOutput += `\n${key}: ${value}`;
          case isObject(value):
            // If the value is an object, output the key and formatted JSON.
            logOutput += `\n${key}: ${JSON.stringify(value, null, 2)}`;
          default:
            // Otherwise, just output the key and its value.
            logOutput += `\n${key}: ${value}`;
        }
      });

      return logOutput;
    });
  }

  if (isFunction(printfOption)) {
    return winstonFormat.printf(printfOption);
  }

  throw new InvalidFormatError({
    fieldName: "printf",
    expectedType: "boolean or Function",
    receivedValue: printfOption,
  });
}

export function createTimestampFormat(timestampOption: FormatOptions["timestamp"]): logform.Format {
  if (isBoolean(timestampOption)) {
    return winstonFormat.timestamp();
  }

  if (isObject(timestampOption)) {
    return winstonFormat.timestamp({
      format: getTimestampFormat(timestampOption),
    });
  }

  throw new InvalidFormatError({
    fieldName: "timestamp",
    expectedType: "boolean or TimestampOptions",
    receivedValue: timestampOption,
  });
}

export function createSimpleFormat(simpleOption: FormatOptions["simple"]): logform.Format {
  if (isBoolean(simpleOption)) {
    return winstonFormat.simple();
  }

  throw new InvalidFormatError({
    fieldName: "simple",
    expectedType: "boolean",
    receivedValue: simpleOption,
  });
}

export function createSplatFormat(splatOption: FormatOptions["splat"]): logform.Format {
  if (isBoolean(splatOption)) {
    return winstonFormat.splat();
  }

  throw new InvalidFormatError({
    fieldName: "splat",
    expectedType: "boolean",
    receivedValue: splatOption,
  });
}

export function createUncolorizeFormat(uncolorizeOption: FormatOptions["uncolorize"]): logform.Format {
  if (isBoolean(uncolorizeOption)) {
    return winstonFormat.uncolorize();
  }

  if (isObject(uncolorizeOption)) {
    return winstonFormat.uncolorize(uncolorizeOption);
  }

  throw new InvalidFormatError({
    fieldName: "uncolorize",
    expectedType: "boolean or UncolorizeOptions",
    receivedValue: uncolorizeOption,
  });
}
