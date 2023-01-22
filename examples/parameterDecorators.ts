import { logBlue, logWhite, logGreen } from "../utils";

// A parameter decorator can only be used to observe that a parameter has been declared on a method.
const logParam = (
  target: Object,
  memberName: string,
  parameterIndex: number
): void => {
  logBlue(
    `The ${memberName} method has a parameter in position ${parameterIndex}`
  );
};

class TestClass {
  public add(@logParam firstNumber: number, @logParam secondNumber: number) {
    return firstNumber + secondNumber;
  }
}

const test = new TestClass();

export const parameterDecoratorExample = async (): Promise<void> => {
  logWhite("Parameter Decorators");
  logGreen(`test.add(3, 4): ${test.add(3, 4)}`);
};
