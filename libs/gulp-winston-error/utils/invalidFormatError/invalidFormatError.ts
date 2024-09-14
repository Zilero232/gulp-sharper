import chalk from "chalk";

interface InvalidFormatErrorProps {
  fieldName: string;
  expectedType: string;
  receivedValue: unknown;
  errorCode?: string;
  additionalMessage?: string;
}

export class InvalidFormatError extends Error {
  constructor({ fieldName, expectedType, receivedValue, errorCode, additionalMessage }: InvalidFormatErrorProps) {
    const errorCodeMessage = errorCode ? `(Error Code: ${chalk.blue(errorCode)})` : "";
    const additionalMessagePart = additionalMessage ? ` - ${chalk.dim(additionalMessage)}` : "";

    // Calling the Error constructor with the generated message.
    super( `Invalid ${fieldName} format: ${chalk.red(JSON.stringify(receivedValue))}, must be ${chalk.green(expectedType)} ${errorCodeMessage} ${additionalMessagePart}` );

    this.name = "InvalidFormatError";
  }
}
