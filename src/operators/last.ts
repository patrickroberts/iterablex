import filter from './filter.js';

export default function last<T>(
  iterable: Iterable<T>, callbackFn?: (value: T, index: number) => boolean,
): T | undefined {
  let last: T | undefined;

  for (const value of callbackFn ? filter(iterable, callbackFn) : iterable) {
    last = value;
  }

  return last;
}
