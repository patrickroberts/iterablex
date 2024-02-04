import type Range from '../interface/Range.js';

export default function reduce<T, U>(
  iterable: Range<T>,
  callbackFn: (accumulator: T | U, value: T, index: number) => T | U,
  ...initialValue: [] | [T | U]
): T | U {
  let accumulator: T | U;
  let index: number;

  if (initialValue.length !== 0) {
    accumulator = initialValue[0];
    index = 0;
  } else {
    const iterator = iterable[Symbol.iterator]();
    const result = iterator.next();

    if (result.done) {
      throw new TypeError('reduce called on empty iterable with no initial value');
    }

    iterable = iterator;
    accumulator = result.value;
    index = 1;
  }

  for (const value of iterable) {
    accumulator = callbackFn(accumulator, value, index);
    index += 1;
  }

  return accumulator;
}
