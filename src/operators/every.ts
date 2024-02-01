import some from './some.js';

export default function every<T>(
  iterable: Iterable<T>, callbackFn: (value: T, index: number) => boolean,
): boolean {
  return !some(
    iterable,
    (value, index) => !callbackFn(value, index),
  );
}
