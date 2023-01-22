import { logRed, logWhite, logGreen } from "../utils";

/**
 * Property Decorator which only allows property to be set to even integers
 * @param target the class containing the property
 * @param memberName the name of the property
 */
const enforceEvenNumber = (target: Object, memberName: string) => {
  let currentValue: number = target[memberName];

  Object.defineProperty(target, memberName, {
    set: (newValue: any) => {
      if (newValue % 2 !== 0) {
        logRed(
          `Attempted to set ${memberName} to ${newValue}, but this property can only take even numbers`
        );
        return;
      }
      currentValue = newValue;
    },
    get: () => currentValue,
  });
};

class TestClass {
  @enforceEvenNumber
  public evenNumber: number = 4;
}

const test = new TestClass();

export const propertyDecoratorExample = async (): Promise<void> => {
  logWhite("Property Decorators");
  console.log(
    "Here we're enforcing that test.evenNumber is an even number by using a property decorator to define a setter method, which tests if input is even and logs an message without updating if not.\n"
  );
  console.log("test.evenNumber is initialised as 4.");
  logGreen(`test.evenNumber: ${test.evenNumber}\n`);

  console.log("test.evenNumber = 7;");
  test.evenNumber = 7;
  logGreen(`test.evenNumber: ${test.evenNumber}\n`);

  console.log("test.evenNumber = 1024;");
  test.evenNumber = 1024;
  logGreen(`test.evenNumber: ${test.evenNumber}`);
};
