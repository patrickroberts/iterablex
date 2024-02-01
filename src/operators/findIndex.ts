import entries from './entries.js';

export default function findIndex<T>(
  iterable: Iterable<T>, callbackFn: (value: T, index: number) => boolean,
): number {
  for (const [index, value] of entries(iterable)) {
    if (callbackFn(value, index)) {
      return index;
    }
  }

  return -1;
}
