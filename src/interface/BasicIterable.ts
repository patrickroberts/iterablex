export default interface BasicIterable<T> {
  [Symbol.iterator](): IterableIterator<T>;
}
