import { createFileTransformHandler } from "./handlers/createFileTransformHandler";
import { createOnFinishHandler } from "./handlers/createOnFinishHandler";

import { createThroughStream } from "./utils";

import type { PluginFactoryOptions, TransformStream } from "./types";

const PluginFactory = (options: PluginFactoryOptions): TransformStream => {
  const fileTransformHandler = createFileTransformHandler(options);
  const onFinishHandler = createOnFinishHandler(options);

  return createThroughStream(fileTransformHandler, onFinishHandler);
};

export default PluginFactory;
