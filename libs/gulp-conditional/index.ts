import through2 from "through2";

import GulpPluginFactory from "@zilero/gulp-plugin-factory";
import GulpWinstonError from "@zilero/gulp-winston-error";

import { checkCondition } from "./utils";

import { PLUGIN_NAME } from "./constants";

import type { GulpConditionalOptions } from "./types";

const GulpConditional = ({ condition, onConditionMet, onConditionNotMet }: GulpConditionalOptions) => {
  if (typeof condition !== "boolean" || typeof condition !== "object") {
    GulpWinstonError({
      pluginName: PLUGIN_NAME,
      message: "Condition must be a boolean or an object with condition options.",
    });
  }

  if (!onConditionMet) {
    GulpWinstonError({
      pluginName: PLUGIN_NAME,
      message: "Transformer function is required and must be a function.",
    });
  }

  return GulpPluginFactory({
    pluginName: PLUGIN_NAME,
    onFile: (file: FileVinyl) => {
      const isConditionMet = checkCondition({ file, condition });

      return isConditionMet ? onConditionMet : onConditionNotMet || through2.obj();
    },
  });
};

export default GulpConditional;
