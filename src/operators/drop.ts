import filter from './filter.js';

export default function drop<T>(
  iterable: Iterable<T>, count: number,
): Generator<T> {
  return filter(
    iterable,
    (_, index) => index >= count,
  )
}
