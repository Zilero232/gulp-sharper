import { format as winstonFormat, Logform as logform } from "winston";

import {
  createAlignFormat,
  createCliFormat,
  createColorizeFormat,
  createErrorsFormat,
  createJsonFormat,
  createLabelFormat,
  createLogstashFormat,
  createMetadataFormat,
  createMsFormat,
  createPadLevelsFormat,
  createPrettyPrintFormat,
  createTimestampFormat,
  createUncolorizeFormat,
} from "@helpers/formatHelpers";

import { FormatOptions } from "@types";

export function createWinstonFormat(options: FormatOptions = {}): logform.Format {
  const formats: logform.Format[] = [];

  if (options.align) {
    formats.push(createAlignFormat(options.align));
  }

  if (options.cli) {
    formats.push(createCliFormat(options.cli));
  }

  if (options.colorize) {
    formats.push(createColorizeFormat(options.colorize));
  }

  if (options.errors) {
    formats.push(createErrorsFormat(options.errors));
  }

  if (options.json) {
    formats.push(createJsonFormat(options.json));
  }

  if (options.label) {
    formats.push(createLabelFormat(options.label));
  }

  if (options.logstash) {
    formats.push(createLogstashFormat(options.logstash));
  }

  if (options.metadata) {
    formats.push(createMetadataFormat(options.metadata));
  }

  if (options.ms) {
    formats.push(createMsFormat(options.ms));
  }

  if (options.padLevels) {
    formats.push(createPadLevelsFormat(options.padLevels));
  }

  if (options.prettyPrint) {
    formats.push(createPrettyPrintFormat(options.prettyPrint));
  }

  if (options.printf) {
    formats.push(winstonFormat.printf(options.printf.templateFunction));
  }

  if (options.simple) {
    formats.push(winstonFormat.simple());
  }

  if (options.splat) {
    formats.push(winstonFormat.splat());
  }

  if (options.timestamp) {
    formats.push(createTimestampFormat(options.timestamp));
  }

  if (options.uncolorize) {
    formats.push(createUncolorizeFormat(options.uncolorize));
  }

  return winstonFormat.combine(...formats);
}
