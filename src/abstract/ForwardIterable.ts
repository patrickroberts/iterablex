import IteratorIterable from '../class/IteratorIterable.js';
import InputIterable from './InputIterable.js';

export default abstract class ForwardIterable<T> extends InputIterable<T> {
  public abstract drop(count: number): ForwardIterable<T>;

  public abstract entries(): ForwardIterable<[number, T]>;

  public abstract filter<S extends T>(callbackFn: (value: T, index: number) => value is S): ForwardIterable<S>;
  public abstract filter(callbackFn: (value: T, index: number) => boolean): ForwardIterable<T>;

  public abstract flatMap<U>(callbackFn: (value: T, index: number) => Iterable<U>): ForwardIterable<U>;

  public abstract map<U>(callbackFn: (value: T, index: number) => U): ForwardIterable<U>;

  public abstract scan<U>(callbackFn: (accumulator: U, value: T, index: number) => U, initialValue: U): ForwardIterable<U>;
  public abstract scan(callbackFn: (accumulator: T, value: T, index: number) => T, ...initialValue: [] | [T]): ForwardIterable<T>;

  public abstract slice(begin?: number, end?: number): ForwardIterable<T>;

  public abstract take(count: number): ForwardIterable<T>;

  public abstract toReversed(): ForwardIterable<T>;

  public abstract toSorted(compareFn?: (a: T, b: T) => number): ForwardIterable<T>;

  public share(): InputIterable<T> {
    return new IteratorIterable(this[Symbol.iterator]());
  }
}
