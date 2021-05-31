import { compose, toLower, converge, concat, toUpper, head, tail } from 'ramda';

export const capitalizeFirstLetter = converge(concat, [
  compose(toUpper, head),
  compose(toLower, tail as (str: string) => string),
]);
