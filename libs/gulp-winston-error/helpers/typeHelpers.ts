/**
 * Checks if the value is an object.
 *
 * @param value The value to check.
 *
 * @returns `true` if the value is an object, otherwise `false`.
 */
export function isObject(value: unknown): value is object {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Checks if the value is a boolean.
 *
 * @param value The value to check.
 *
 * @returns `true` if the value is a boolean, otherwise `false`.
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

/**
 * Checks if the value is a string.
 *
 * @param value The value to check.
 *
 * @returns `true` if the value is a string, otherwise `false`.
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * Checks if the value is an instance of Error.
 *
 * @param value The value to check.
 *
 * @returns `true` if the value is an instance of Error, otherwise `false`.
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error;
}

/**
 * Checks if the value is a function.
 *
 * @param value The value to check.
 *
 * @returns `true` if the value is a function, otherwise `false`.
 */
export function isFunction(value: unknown): value is Function {
  return typeof value === "function";
}
