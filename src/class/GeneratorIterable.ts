import ForwardIterable from '../abstract/ForwardIterable.js';
import type BasicIterable from '../interface/BasicIterable.js';
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

export default class GeneratorIterable<T> extends ForwardIterable<T> {
  readonly #iterable: BasicIterable<T>;

  public constructor(iterable: BasicIterable<T>) {
    super();
    this.#iterable = iterable;
  }

  public static from<T>(generator: () => IterableIterator<T>): ForwardIterable<T> {
    return new GeneratorIterable({ [Symbol.iterator]: generator });
  }

  public [Symbol.iterator](): IterableIterator<T> {
    return this.#iterable[Symbol.iterator]();
  }

  public drop(count: number): ForwardIterable<T> {
    return GeneratorIterable.from(() => drop(this, count));
  }

  public entries(): ForwardIterable<[number, T]> {
    return GeneratorIterable.from(() => entries(this));
  }

  public filter(callbackFn: (value: T, index: number) => boolean): ForwardIterable<T> {
    return GeneratorIterable.from(() => filter(this, callbackFn));
  }

  public flatMap<U>(callbackFn: (value: T, index: number) => Iterable<U>): ForwardIterable<U> {
    return GeneratorIterable.from(() => flatMap(this, callbackFn));
  }

  public map<U>(callbackFn: (value: T, index: number) => U): ForwardIterable<U> {
    return GeneratorIterable.from(() => map(this, callbackFn));
  }

  public scan<U>(callbackFn: (accumulator: T | U, value: T, index: number) => T | U, ...initialValue: [] | [T | U]): ForwardIterable<T | U> {
    return GeneratorIterable.from(() => scan(this, callbackFn, ...initialValue));
  }

  public slice(begin?: number, end?: number): ForwardIterable<T> {
    return GeneratorIterable.from(() => slice(this, begin, end));
  }

  public take(count: number): ForwardIterable<T> {
    return GeneratorIterable.from(() => take(this, count));
  }

  public toReversed(): ForwardIterable<T> {
    return GeneratorIterable.from(() => toReversed(this));
  }

  public toSorted(compareFn?: (a: T, b: T) => number): ForwardIterable<T> {
    return GeneratorIterable.from(() => toSorted(this, compareFn));
  }
}
