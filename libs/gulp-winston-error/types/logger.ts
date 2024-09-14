import { LoggerOptions, type Logform as logform } from "winston";

import type { TransportsOptions } from "./transports";
import type { ColorizeOptions } from "./colorize";

// Logging levels.
export enum LOG_LEVELS {
  error = "error",
  warn = "warn",
  info = "info",
  http = "http",
  verbose = "verbose",
  debug = "debug",
  silly = "silly",
}

// Getting the type of LOG_LEVELS keys
export type LogLevelKeys = keyof typeof LOG_LEVELS;

// Defines the possible formats for timestamps in logs.
export type TimestampFormat =
  | "ISO" // ISO 8601 format.
  | "UNIX" // Unix timestamp format.
  | "FULL_DATE" // Full date format.
  | "SHORT" // Short date and time format.
  | "TIME_ONLY" // Time only format.
  | "DATE_ONLY"; // Date only format.

// Configuration options for the GulpWinstonError plugin.
export interface GulpWinstonErrorOptions extends Omit<LoggerOptions, "format" | "transports"> {
  pluginName: string; // The name of the plugin (required).
  level?: LogLevelKeys; // Logging level.
  exitOnError?: boolean | ((err: Error) => void); // Behavior on error.
  format?: FormatOptions; // Format options.
  transports?: TransportsOptions; // Transport options.
}

// Log formatting options.
export interface FormatOptions {
  align?: boolean; // Align logs
  cli?: boolean | logform.CliOptions; // CLI format.
  colorize?: boolean | ColorizeOptions; // Colorize logs.
  errors?: boolean | { stack: boolean }; // Log errors with stack traces.
  json?: boolean | logform.JsonOptions; // JSON format.
  label?: string | logform.LabelOptions; // Label for logs.
  logstash?: boolean; // Logstash format.
  metadata?: boolean | logform.MetadataOptions; // Metadata.
  ms?: boolean; // Add milliseconds to log.
  padLevels?: boolean | { levels: Record<LogLevelKeys, number> }; // Pad logging levels.
  prettyPrint?: boolean | logform.PrettyPrintOptions; // Pretty print output.
  printf?: { templateFunction: (info: logform.TransformableInfo) => string }; // Custom format output.
  simple?: boolean; // Simple format.
  splat?: boolean; // Format with printf support.
  timestamp?: boolean | TimestampOptions; // Add timestamp.
  uncolorize?: boolean | logform.UncolorizeOptions; // Disable color formatting.
}

// Timestamp options
export interface TimestampOptions extends logform.TimestampOptions {
  /**
   * - 'ISO' for ISO 8601.
   * - 'UNIX' for Unix timestamp.
   * - 'FULL_DATE' for full date.
   * - 'SHORT' for short date and time format.
   * - 'TIME_ONLY' for time only.
   * - 'DATE_ONLY' for date only.
   */
  format?: TimestampFormat | string;
}
