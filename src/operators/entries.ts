export default function* entries<T>(
  iterable: Iterable<T>,
): Generator<[number, T]> {
  let index = 0;

  for (const value of iterable) {
    yield [index, value];
    index += 1;
  }
}
