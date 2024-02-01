import entries from './entries.js';

export default function find<T>(
  iterable: Iterable<T>, callbackFn: (value: T, index: number) => boolean,
): T | undefined {
  for (const [index, value] of entries(iterable)) {
    if (callbackFn(value, index)) {
      return value;
    }
  }
}
