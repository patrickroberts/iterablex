import ForwardRange from '../abstract/ForwardRange.js';
import type Range from '../interface/Range.js';
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

export default class GeneratorRange<T> extends ForwardRange<T> {
  readonly #iterable: Range<T>;

  public constructor(iterable: Range<T>) {
    super();
    this.#iterable = iterable;
  }

  public static from<T>(generator: () => IterableIterator<T>): ForwardRange<T> {
    return new GeneratorRange({ [Symbol.iterator]: generator });
  }

  public [Symbol.iterator](): IterableIterator<T> {
    return this.#iterable[Symbol.iterator]();
  }

  public drop(count: number): ForwardRange<T> {
    return GeneratorRange.from(() => drop(this, count));
  }

  public entries(): ForwardRange<[number, T]> {
    return GeneratorRange.from(() => entries(this));
  }

  public filter(callbackFn: (value: T, index: number) => boolean): ForwardRange<T> {
    return GeneratorRange.from(() => filter(this, callbackFn));
  }

  public flatMap<U>(callbackFn: (value: T, index: number) => Iterable<U>): ForwardRange<U> {
    return GeneratorRange.from(() => flatMap(this, callbackFn));
  }

  public map<U>(callbackFn: (value: T, index: number) => U): ForwardRange<U> {
    return GeneratorRange.from(() => map(this, callbackFn));
  }

  public scan<U>(callbackFn: (accumulator: T | U, value: T, index: number) => T | U, ...initialValue: [] | [T | U]): ForwardRange<T | U> {
    return GeneratorRange.from(() => scan(this, callbackFn, ...initialValue));
  }

  public slice(begin?: number, end?: number): ForwardRange<T> {
    return GeneratorRange.from(() => slice(this, begin, end));
  }

  public take(count: number): ForwardRange<T> {
    return GeneratorRange.from(() => take(this, count));
  }

  public toReversed(): ForwardRange<T> {
    return GeneratorRange.from(() => toReversed(this));
  }

  public toSorted(compareFn?: (a: T, b: T) => number): ForwardRange<T> {
    return GeneratorRange.from(() => toSorted(this, compareFn));
  }
}
