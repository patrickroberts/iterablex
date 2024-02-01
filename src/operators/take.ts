export default function* take<T>(
  iterable: Iterable<T>, count: number,
): Generator<T> {
  let index = 0;

  if (index >= count) {
    return;
  }

  for (const value of iterable) {
    yield value;
    index += 1;

    if (index >= count) {
      return;
    }
  }
}
