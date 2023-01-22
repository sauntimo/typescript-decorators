import { accessorDecoratorExample } from "./examples/accessorDecorators";
import { classDecoratorExample } from "./examples/classDecorators";
import { methodDecoratorExample } from "./examples/methodDecorators";
import { propertyDecoratorExample } from "./examples/propertyDecorators";
import { logRed } from "./utils";
const chalk = require("chalk");
const cliSelect = require("cli-select");

const main = () => {
  cliSelect({
    values: [
      "Class Decorators",
      "Method Decorators",
      "Accessor Decorators",
      "Property Decorators",
      "Exit",
    ],
    valueRenderer: (value, selected) =>
      selected ? chalk.underline(value) : value,
  })
    .then(async (response) => {
      console.clear();
      switch (response.value) {
        case "Class Decorators":
          await classDecoratorExample();
          break;
        case "Method Decorators":
          await methodDecoratorExample();
          break;
        case "Accessor Decorators":
          await accessorDecoratorExample();
          break;
        case "Property Decorators":
          await propertyDecoratorExample();
          break;
        case "Exit":
          process.exit(0);
        default:
          logRed("Invalid Option");
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      console.log("\n");
      main();
    });
};

main();
