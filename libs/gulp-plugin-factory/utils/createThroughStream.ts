import through2, { type TransformCallback } from "through2";

import PluginReporter from "@zilero/gulp-error-reporter";

import type { Transformer, Flusher, TransformStream } from "../types";

const createThroughStream = (transformer: Transformer, flusher: Flusher): TransformStream => {
  // Checking for the presence of the transformer function.
  if (!transformer || typeof transformer !== "function") {
    throw PluginReporter({
      pluginName: "Plugin",
      message: "Transformer function is required and must be a function.",
    });
  }

  // Checking for the presence of the flusher function.
  if (flusher && typeof flusher !== "function") {
    throw PluginReporter({
      pluginName: "Plugin",
      message: "Flusher function is required and must be a function.",
    });
  }

  return through2.obj(
    async function (this: TransformStream, file: FileVinyl, encoding: BufferEncoding, callback: TransformCallback): Promise<void> {
      // Checking that the file is not null.
      if (file.isNull()) {
        callback(null, file);
      }

      if (file.isStream()) {
        // If the file is not a stream, we throw an error.
        callback(
          PluginReporter({
            pluginName: "Plugin",
            message: "Streaming not supported.",
          })
        );
      }

      try {
        const result = await transformer(file, encoding, this);

        if (!result) {
          callback(null, file);
        }

        callback(null, result);
      } catch (error: unknown) {
        callback(error as Error);
      }
    },
    async function (this: TransformStream): Promise<void> {
      try {
        flusher(this);
      } catch (error: unknown) {
        throw PluginReporter(
          {
            pluginName: "Plugin",
          },
          error as Error
        );
      }
    }
  );
};

export default createThroughStream;
