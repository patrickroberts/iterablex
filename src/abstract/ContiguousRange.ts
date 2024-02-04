import RandomAccessRange from './RandomAccessRange.js';

export default abstract class ContiguousRange<T> extends RandomAccessRange<T> {
  public abstract slice(begin?: number, end?: number): ContiguousRange<T>;
}
