import BidirectionalRange from './BidirectionalRange.js';

export default abstract class RandomAccessRange<T> extends BidirectionalRange<T> {
  public abstract at(index: number): T | undefined;

  public abstract drop(count: number): RandomAccessRange<T>;

  public abstract entries(): RandomAccessRange<[number, T]>;

  public abstract get length(): number;

  public abstract map<U>(callbackFn: (value: T, index: number) => U): RandomAccessRange<U>;

  public abstract slice(begin?: number, end?: number): RandomAccessRange<T>;

  public abstract take(count: number): RandomAccessRange<T>;

  public abstract toReversed(): RandomAccessRange<T>;

  public every<S extends T>(callbackFn: (value: T, index: number) => value is S): this is RandomAccessRange<S>;
  public every(callbackFn: (value: T, index: number) => boolean): boolean;
  public every(callbackFn: (value: T, index: number) => boolean): boolean {
    return super.every(callbackFn);
  }

  public findLastIndex(callbackFn: (value: T, index: number) => boolean): number {
    const index = this.toReversed().findIndex(callbackFn);
    return index === -1 ? -1 : this.length - index - 1;
  }

  public lastIndexOf(searchElement: T, fromIndex = 0): number {
    const index = this.toReversed().lastIndexOf(searchElement, fromIndex);
    return index === -1 ? -1 : this.length - index - 1;
  }
}
