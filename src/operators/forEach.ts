import entries from './entries.js';

export default function forEach<T>(
  iterable: Iterable<T>, callbackFn: (value: T, index: number) => void,
): void {
  for (const [index, value] of entries(iterable)) {
    callbackFn(value, index);
  }
}
