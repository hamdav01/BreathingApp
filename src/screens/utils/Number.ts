import {
  converge,
  multiply,
  divide,
  __,
  modulo,
  compose,
  sum,
  length,
} from 'ramda';

export const convertMinuteIntoSeconds = multiply(60);

const convertIntoMinuteFormat = (minute: number, seconds: number) =>
  `${minute}:${seconds}`;

export const convertSecondsIntoMinute = converge(convertIntoMinuteFormat, [
  compose(Math.floor, divide(__, 60)),
  modulo(__, 60),
]);

export const calculateAverage = converge(divide, [sum, length]);
