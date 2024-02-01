import type BasicIterable from '../interface/BasicIterable.js';

export default function* scan<T, U>(
  iterable: BasicIterable<T>,
  callbackFn: (accumulator: T | U, value: T, index: number) => T | U,
  ...initialValue: [] | [T | U]
): Generator<T | U> {
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
    yield accumulator = result.value;
    index = 1;
  }

  for (const value of iterable) {
    yield accumulator = callbackFn(accumulator, value, index);
    index += 1;
  }
}
