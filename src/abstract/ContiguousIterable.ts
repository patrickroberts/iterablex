import RandomAccessIterable from './RandomAccessIterable.js';

export default abstract class ContiguousIterable<T> extends RandomAccessIterable<T> {
  public abstract slice(begin?: number, end?: number): ContiguousIterable<T>;
}
