import drop from './drop.js';
import some from './some.js';

export default function includes<T>(
  iterable: Iterable<T>, searchElement: T, fromIndex = 0,
): boolean {
  return some(
    fromIndex === 0 ? iterable : drop(iterable, fromIndex),
    value => Object.is(value, searchElement),
  );
}
