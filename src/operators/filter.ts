import flatMap from './flatMap.js';

export default function filter<T>(
  iterable: Iterable<T>, callbackFn: (value: T, index: number) => boolean,
): Generator<T> {
  return flatMap(
    iterable,
    (value, index) => callbackFn(value, index) ? [value] : [],
  );
}
