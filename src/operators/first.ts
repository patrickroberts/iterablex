import filter from './filter.js';

export default function first<T>(
  iterable: Iterable<T>, callbackFn?: (value: T, index: number) => boolean,
): T | undefined {
  for (const value of callbackFn ? filter(iterable, callbackFn) : iterable) {
    return value;
  }
}
