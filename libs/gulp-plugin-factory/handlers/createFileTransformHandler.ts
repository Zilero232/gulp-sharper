import PluginReporter from "@zilero/gulp-error-reporter";

import type { PluginFactoryOptions, Transformer, TransformStream } from "../types";

import checkIsFile from "../utils/checkIsFile";

export function createFileTransformHandler({
  pluginName,
  supportsDirectories = false,
  supportsAnyType = false,
  onFile,
}: PluginFactoryOptions): Transformer {
  return async (file: FileVinyl, encoding: BufferEncoding, stream: TransformStream): Promise<FileVinyl | void> => {
    if (!supportsAnyType && !supportsDirectories) {
      return file;
    }

    try {
      const result = await onFile(file, encoding, stream);

      // Check if the result is a File or not;
      if (checkIsFile(result)) {
        return result; // Return the result if it's a File
      }

      return file;
    } catch (error: unknown) {
      PluginReporter(
        {
          pluginName,
          showStack: true,
        },
        error as Error
      );
    }
  };
}
