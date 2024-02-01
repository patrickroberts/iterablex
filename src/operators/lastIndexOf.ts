import drop from './drop.js';
import findLastIndex from './findLastIndex.js';

export default function lastIndexOf<T>(
  iterable: Iterable<T>, searchElement: T, fromIndex = 0,
): number {
  return findLastIndex(
    fromIndex === 0 ? iterable : drop(iterable, fromIndex),
    value => Object.is(value, searchElement),
  );
}
