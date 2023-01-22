import { logBlue, logWhite } from "../utils";

/**
 * Class Decorator Factory, which returns a class decorator which adds a "greet"
 * method, which logs the given text
 * @param greeting text to log as a greeting
 * @returns Class Decorator
 */
const addGreetMethod = (greeting: string) => (target: Function) => {
  Object.defineProperty(target.prototype, "greet", {
    value: function () {
      logBlue(`${greeting}`);
    },
  });
};

// required for typescript to believe that the method we're adding exists
// which kind of defeates the point
class Base {
  greet: () => void;
}

@addGreetMethod("How're ya now?")
class TestClass extends Base {
  // nothing in this class
}

const test = new TestClass();

export const classDecoratorExample = async (): Promise<void> => {
  logWhite("Class Decorator");
  console.log(
    "Class has no defined greet method, but we've added one with a decorator."
  );
  console.log("test.greet()\n");
  test.greet();
};
