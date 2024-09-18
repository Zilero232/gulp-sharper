import through2, { type TransformCallback } from "through2";

import GulpWinstonError from "@zilero/gulp-winston-error";

import type { Transformer, Flusher, TransformStream } from "../../types";

import { handleUnknownError } from "../handleUnknownError/handleUnknownError";

import { PLUGIN_NAME } from "../../constants";

export const createThroughStream = (transformer: Transformer, flusher: Flusher): TransformStream => {
  // Checking for the presence of the transformer function.
  if (!transformer || typeof transformer !== "function") {
    GulpWinstonError({
      pluginName: PLUGIN_NAME,
      message: "Transformer function is required and must be a function.",
    });
  }

  // Checking for the presence of the flusher function.
  if (flusher && typeof flusher !== "function") {
    GulpWinstonError({
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
          GulpWinstonError({
            pluginName: PLUGIN_NAME,
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
        handleUnknownError({
          pluginName: PLUGIN_NAME,
          error,
        });
      }
    }
  );
};

export default createThroughStream;
