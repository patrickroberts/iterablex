import entries from './entries.js';

export default function* flatMap<T, U>(
  iterable: Iterable<T>, callbackFn: (value: T, index: number) => Iterable<U>,
) {
  for (const [index, value] of entries(iterable)) {
    yield* callbackFn(value, index);
  }
}
