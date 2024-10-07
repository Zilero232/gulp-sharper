import chalk from "chalk";

interface InvalidFormatErrorProps {
  fieldName: string;
  receivedValue: unknown;
  expectedType: string;
  errorCode?: string;
  additionalMessage?: string;
}

export class InvalidFormatError extends Error {
  constructor({ fieldName, receivedValue, expectedType, errorCode, additionalMessage }: InvalidFormatErrorProps) {
    let message = `Invalid ${chalk.bold(fieldName)} format: ${chalk.red(JSON.stringify(receivedValue))}, must be ${chalk.green(expectedType)}`;

    if (errorCode) {
      message += ` (Error Code: ${errorCode})`;
    }

    if (additionalMessage) {
      message += ` - ${additionalMessage}`;
    }

    // Calling the Error constructor with the generated message to set the `message` property.
    super(message);

    this.name = "InvalidFormatError";
  }
}
