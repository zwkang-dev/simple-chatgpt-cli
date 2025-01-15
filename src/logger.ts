import { green, greenBright, yellow } from 'colorette';

const logger = {
  info: (str: string) => {
    console.log(greenBright(str));
  },
  warn: (str: string) => {
    console.log(yellow(str));
  },
  error: (str: string) => {
    console.log(yellow(str));
  },
  success: (str: string) => {
    console.log(green(str));
  },
  table: <T>(str: Array<T>) => {
    console.table(str);
  },

  yellow,
};

export default logger;
