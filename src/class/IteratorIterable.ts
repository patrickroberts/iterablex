import InputIterable from '../abstract/InputIterable.js';
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

export default class IteratorIterable<T> extends InputIterable<T> implements IterableIterator<T> {
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

  public drop(count: number): InputIterable<T> {
    return new IteratorIterable(drop(this, count));
  }

  public entries(): InputIterable<[number, T]> {
    return new IteratorIterable(entries(this));
  }

  public filter(callbackFn: (value: T, index: number) => boolean): InputIterable<T> {
    return new IteratorIterable(filter(this, callbackFn));
  }

  public flatMap<U>(callbackFn: (value: T, index: number) => Iterable<U>): InputIterable<U> {
    return new IteratorIterable(flatMap(this, callbackFn));
  }

  public map<U>(callbackFn: (value: T, index: number) => U): InputIterable<U> {
    return new IteratorIterable(map(this, callbackFn));
  }

  public scan<U>(callbackFn: (accumulator: T | U, value: T, index: number) => T | U, ...initialValue: [] | [T | U]): InputIterable<T | U> {
    return new IteratorIterable(scan(this, callbackFn, ...initialValue));
  }

  public slice(begin?: number, end?: number): InputIterable<T> {
    return new IteratorIterable(slice(this, begin, end));
  }

  public take(count: number): InputIterable<T> {
    return new IteratorIterable(take(this, count));
  }

  public toReversed(): InputIterable<T> {
    return new IteratorIterable(toReversed(this));
  }

  public toSorted(compareFn?: (a: T, b: T) => number): InputIterable<T> {
    return new IteratorIterable(toSorted(this, compareFn));
  }
}
