import InputRange from '../abstract/InputRange.js';
import drop from '../operators/drop.js';
import entries from '../operators/entries.js';
import filter from '../operators/filter.js';
import flatMap from '../operators/flatMap.js';
import map from '../operators/map.js';
import scan from '../operators/scan.js';
import slice from '../operators/slice.js';
import take from '../operators/take.js';
import toReversed from '../operators/toReversed.js';
import toSorted from '../operators/toSorted.js';

export default class IteratorRange<T> extends InputRange<T> implements IterableIterator<T> {
  readonly #iterableIterator: IterableIterator<T>;

  public constructor(iterableIterator: IterableIterator<T>) {
    super();
    this.#iterableIterator = iterableIterator;
  }

  public [Symbol.iterator](): IterableIterator<T> {
    return this;
  }

  public next(): IteratorResult<T> {
    return this.#iterableIterator.next();
  }

  public drop(count: number): InputRange<T> {
    return new IteratorRange(drop(this, count));
  }

  public entries(): InputRange<[number, T]> {
    return new IteratorRange(entries(this));
  }

  public filter(callbackFn: (value: T, index: number) => boolean): InputRange<T> {
    return new IteratorRange(filter(this, callbackFn));
  }

  public flatMap<U>(callbackFn: (value: T, index: number) => Iterable<U>): InputRange<U> {
    return new IteratorRange(flatMap(this, callbackFn));
  }

  public map<U>(callbackFn: (value: T, index: number) => U): InputRange<U> {
    return new IteratorRange(map(this, callbackFn));
  }

  public scan<U>(callbackFn: (accumulator: T | U, value: T, index: number) => T | U, ...initialValue: [] | [T | U]): InputRange<T | U> {
    return new IteratorRange(scan(this, callbackFn, ...initialValue));
  }

  public slice(begin?: number, end?: number): InputRange<T> {
    return new IteratorRange(slice(this, begin, end));
  }

  public take(count: number): InputRange<T> {
    return new IteratorRange(take(this, count));
  }

  public toReversed(): InputRange<T> {
    return new IteratorRange(toReversed(this));
  }

  public toSorted(compareFn?: (a: T, b: T) => number): InputRange<T> {
    return new IteratorRange(toSorted(this, compareFn));
  }
}
