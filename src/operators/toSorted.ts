export default function* toSorted<T>(
  iterable: Iterable<T>, compareFn?: (a: T, b: T) => number,
) {
  return [...iterable].sort(compareFn);
}
