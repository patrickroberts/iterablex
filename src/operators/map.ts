import flatMap from './flatMap.js';

export default function map<T, U>(
  iterable: Iterable<T>, callbackFn: (value: T, index: number) => U,
): Generator<U> {
  return flatMap(
    iterable,
    (value, index) => [callbackFn(value, index)],
  );
}
