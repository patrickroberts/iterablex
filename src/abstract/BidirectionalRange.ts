import ForwardRange from './ForwardRange.js';

export default abstract class BidirectionalRange<T> extends ForwardRange<T> {
  public abstract entries(): BidirectionalRange<[number, T]>;

  public abstract filter<S extends T>(callbackFn: (value: T, index: number) => value is S): BidirectionalRange<S>;
  public abstract filter(callbackFn: (value: T, index: number) => boolean): BidirectionalRange<T>;

  public abstract map<U>(callbackFn: (value: T, index: number) => U): BidirectionalRange<U>;

  public abstract toReversed(): BidirectionalRange<T>;

  public findLast(callbackFn: (value: T, index: number) => boolean): T | undefined;
  public findLast<S extends T>(callbackFn: (value: T, index: number) => value is S): S | undefined;
  public findLast(callbackFn: (value: T, index: number) => boolean): T | undefined {
    return this.toReversed().find(callbackFn);
  }

  public last<S extends T>(callbackFn?: (value: T, index: number) => value is S): S | undefined
  public last(callbackFn?: (value: T, index: number) => boolean): T | undefined;
  public last(callbackFn?: (value: T, index: number) => boolean): T | undefined {
    return this.toReversed().first(callbackFn);
  }

  public reduceRight(callbackFn: (accumulator: T, value: T, index: number) => T, ...initialValue: [] | [T]): T;
  public reduceRight<U>(callbackFn: (accumulator: U, value: T, index: number) => U, initialValue: U): U;
  public reduceRight<U>(callbackFn: (accumulator: T | U, value: T, index: number) => T | U, ...initialValue: [T | U]): T | U {
    return this.toReversed().reduce(callbackFn, ...initialValue);
  }
}
