export default function* toReversed<T>(
  iterable: Iterable<T>,
) {
  yield* [...iterable].reverse();
}
