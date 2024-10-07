import GulpWinstonError from "@zilero/gulp-winston-error";

import { isNumber } from "@shared/helpers/typeHelpers";

import { PLUGIN_NAME } from "../constants";

interface ValidateRangeProps {
  paramName: string;
  value: number;
  min: number;
  max: number;
}

/**
 * Validates if the provided value is a number and lies within the specified range.
 *
 * @param value The value to validate.
 * @param min The minimum value of the range.
 * @param max The maximum value of the range.
 * @param paramName The name of the parameter being validated (for error message clarity).
 *
 * @returns `true` if the value is within the range, otherwise throws an error.
 */
export const validateRange = ({ value, min, max, paramName }: ValidateRangeProps) => {
  if (!isNumber(value)) {
    return GulpWinstonError({
      pluginName: PLUGIN_NAME,
      message: `${paramName} must be a valid number. Provided: ${value}`,
    });
  }

  if (!isNumber(min)) {
    return GulpWinstonError({
      pluginName: PLUGIN_NAME,
      message: `Minimum value (min) must be a valid number. Provided: ${min}`,
    });
  }

  if (!isNumber(max)) {
    return GulpWinstonError({
      pluginName: PLUGIN_NAME,
      message: `Maximum value (max) must be a valid number. Provided: ${max}`,
    });
  }

  if (value < min || value > max) {
    return GulpWinstonError({
      pluginName: PLUGIN_NAME,
      message: `${paramName} must be between ${min} and ${max}. Provided: ${value}`,
    });
  }

  return true;
};
