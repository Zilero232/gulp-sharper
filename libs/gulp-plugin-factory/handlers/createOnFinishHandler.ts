import { type Transform as TransformStream } from "node:stream";

import { handleUnknownError } from "../utils/handleUnknownError/handleUnknownError";

import type { PluginFactoryOptions, Flusher } from "../types";

export function createOnFinishHandler({ pluginName, onFinish }: PluginFactoryOptions): Flusher {
  // If onFinish is not provided, return a no-op function.
  if (!onFinish) {
    return async () => {}; // No-op function
  }

  return async (stream: TransformStream) => {
    try {
      await onFinish(stream);
    } catch (error: unknown) {
      handleUnknownError({
        pluginName,
        error,
      });
    }
  };
}
