import { performance } from "perf_hooks";
import {
  delay,
  durationDays,
  logBlue,
  logGreen,
  logRed,
  logWhite,
} from "../utils";

/**
 * Decorator to time execution of a method
 * @param target the class containing the method
 * @param memberName the name of the method
 * @param descriptor method descriptor
 */
const timer = (
  target: Object,
  memberName: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args) {
    logBlue(`This decorator will time the execution of this method`);
    const start = performance.now();
    const result = await originalMethod.apply(this, args);
    const end = performance.now();
    const duration = end - start;
    logBlue(`Execution duration: ${duration.toFixed(3)} ms`);
    return result;
  };

  return descriptor;
};

/**
 * Method Decorator Factory to warn that a method is shortly to be depricated
 * @param depricationDate Date the method will be depricated
 * @param warningText explanatino text appending to warning
 * @returns Method Decorator
 */
const depricatedWarning =
  (depricationDate: Date, warningText: string) =>
  (target: Object, memberName: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args) {
      const daysTilDepricated = durationDays(depricationDate, new Date());

      if (daysTilDepricated <= 30) {
        logRed(
          `⚠️ Method will be depricated in ${daysTilDepricated} days - avoid usage: ${warningText}`
        );
      } else {
        logBlue(
          `This method will depricated soon and should be avoided: ${warningText}`
        );
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };

class TestClass {
  @timer
  async waitOneSecond() {
    logGreen("Waiting one second...");
    await delay(1000);
    logGreen("Finished waiting!");
  }

  @depricatedWarning(
    new Date("2023-02-01"),
    "The foo team are shutting down the bar API"
  )
  async doSomethingTheOldWay() {
    logGreen(
      "Gonna head on over to this old external service, hope it still works! 🤞"
    );
    await delay(1000);
    logGreen(
      "Seems to work for the moment, guess I won't bother updating this just yet..."
    );
    return 42;
  }
}

const test = new TestClass();

export const methodDecoratorExample = async (): Promise<void> => {
  logWhite("Method Decorator Example");
  console.log(
    "Method has no timers, but we're wrapping the orginal method with a timer function using a decorator."
  );
  console.log("test.waitOneSecond()\n");
  await test.waitOneSecond();

  logWhite("\nMethod Decorator Factory Example");
  console.log(
    "Here we're using a function which returns a decorator (a decorator factory) to provide arguments to the decorator logic."
  );
  console.log("test.doSomethingTheOldWay()\n");
  await test.doSomethingTheOldWay();
};
