const chalk = require("chalk");

const makeColourLogger = (colour: string) => (text: string) =>
  console.log(chalk[colour](text));

export const logBlue = makeColourLogger("bgCyan");
export const logGreen = makeColourLogger("bgGreen");
export const logRed = makeColourLogger("bgRed");
export const logWhite = makeColourLogger("bold");

/**
 * Utility fn to wait for a number of milliseconds
 * @param ms milliseconds to delay execution for
 */
export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * Calculate number of days between two dates
 * @param startDate earlier date
 * @param endDate later date
 */
export const durationDays = (startDate: Date, endDate: Date) => {
  const difference = startDate.getTime() - endDate.getTime();
  return Math.ceil(difference / (1000 * 3600 * 24));
};
