import entries from './entries.js';

export default function findLastIndex<T>(
  iterable: Iterable<T>, callbackFn: (value: T, index: number) => boolean,
): number {
  let last = -1;

  for (const [index, value] of entries(iterable)) {
    if (callbackFn(value, index)) {
      last = index;
    }
  }

  return last;
}
