import entries from './entries.js';

export default function findLast<T>(
  iterable: Iterable<T>, callbackFn: (value: T, index: number) => boolean,
): T | undefined {
  let last: T | undefined;

  for (const [index, value] of entries(iterable)) {
    if (callbackFn(value, index)) {
      last = value;
    }
  }

  return last;
}
