import { logWhite, logGreen } from "../utils";

/**
 * Decorator factory which returns an Accessor Decorator which modifies the set
 * function to round input to the nearest multiple of a given value
 * @param value number to round to
 * @returns Accessor Decorator
 */
const roundToNearest =
  (value: number) =>
  (target: Object, memberName: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.set;

    descriptor.set = function (newValue: number) {
      return original.call(this, Math.ceil(newValue / value) * value);
    };
  };

/**
 * Accessor Decorator which modifies the get function to output the property
 * as string with a percentage sign appended to it
 * @param target the class containing the property
 * @param memberName the name of the property
 * @param descriptor property accessors descriptor
 */
const asPercent = (
  target: Object,
  memberName: string,
  descriptor: PropertyDescriptor
) => {
  const original = descriptor.get;

  descriptor.get = function () {
    return `${original.call(this)}%`;
  };
};

class TestClass {
  #percentage: number;

  @roundToNearest(5)
  @asPercent
  get percentage(): number {
    return this.#percentage;
  }
  set percentage(value: number) {
    this.#percentage = value;
  }
}

const test = new TestClass();

export const accessorDecoratorExample = async (): Promise<void> => {
  test.percentage = 73.67;

  logWhite("Accessor Decorators");
  console.log(
    "Although the private field is just a number on the test class, we're using decorators to modify the getter (to add a percent symbol) and the setter (to round the value).\n"
  );
  console.log("test.percentage = 73.67;");
  logGreen(`test.percentage: ${test.percentage}`);
};
