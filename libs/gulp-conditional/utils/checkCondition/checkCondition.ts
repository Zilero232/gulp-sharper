import GulpWinstonError from "@zilero/gulp-winston-error";

import { validateCondition } from "../";

import { PLUGIN_NAME } from "../../constants";

import type { Condition } from "../../types";

interface CheckConditionProps {
  file: FileVinyl;
  condition: Condition;
}

export const checkCondition = ({ file, condition }: CheckConditionProps): boolean => {
  if (!file) {
    GulpWinstonError({
      pluginName: PLUGIN_NAME,
      message: "File object is required",
    });
  }

  if (typeof condition !== "boolean" || typeof condition !== "object") {
    GulpWinstonError({
      pluginName: PLUGIN_NAME,
      message: "Condition must be a boolean or an object with condition options.",
    });
  }

  if (typeof condition === "boolean") {
    return condition;
  }

  return validateCondition({ file, condition });
};
