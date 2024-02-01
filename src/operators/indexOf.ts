import drop from './drop.js';
import findIndex from './findIndex.js';

export default function indexOf<T>(
  iterable: Iterable<T>, searchElement: T, fromIndex = 0,
): number {
  return findIndex(
    fromIndex === 0 ? iterable : drop(iterable, fromIndex),
    value => Object.is(value, searchElement),
  );
}
