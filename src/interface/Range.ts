export default interface Range<T> {
  [Symbol.iterator](): IterableIterator<T>;
}
