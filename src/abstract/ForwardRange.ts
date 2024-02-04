import IteratorRange from '../class/IteratorRange.js';
import InputRange from './InputRange.js';

export default abstract class ForwardRange<T> extends InputRange<T> {
  public abstract drop(count: number): ForwardRange<T>;

  public abstract entries(): ForwardRange<[number, T]>;

  public abstract filter<S extends T>(callbackFn: (value: T, index: number) => value is S): ForwardRange<S>;
  public abstract filter(callbackFn: (value: T, index: number) => boolean): ForwardRange<T>;

  public abstract flatMap<U>(callbackFn: (value: T, index: number) => Iterable<U>): ForwardRange<U>;

  public abstract map<U>(callbackFn: (value: T, index: number) => U): ForwardRange<U>;

  public abstract scan<U>(callbackFn: (accumulator: U, value: T, index: number) => U, initialValue: U): ForwardRange<U>;
  public abstract scan(callbackFn: (accumulator: T, value: T, index: number) => T, ...initialValue: [] | [T]): ForwardRange<T>;

  public abstract slice(begin?: number, end?: number): ForwardRange<T>;

  public abstract take(count: number): ForwardRange<T>;

  public abstract toReversed(): ForwardRange<T>;

  public abstract toSorted(compareFn?: (a: T, b: T) => number): ForwardRange<T>;

  public share(): InputRange<T> {
    return new IteratorRange(this[Symbol.iterator]());
  }
}
