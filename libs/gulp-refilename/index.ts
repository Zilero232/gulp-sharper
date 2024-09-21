import GulpPluginFactory from "@zilero/gulp-plugin-factory";
import GulpWinstonError from "@zilero/gulp-winston-error";

import type { GulpRefilenameOptions } from "./types";

import { PLUGIN_NAME } from "./constants";

const GulpRefilename = ({}: GulpRefilenameOptions) => {
  return GulpPluginFactory({
    pluginName: PLUGIN_NAME,
    onFile: (file: FileVinyl) => {},
  });
};

export default GulpRefilename;
