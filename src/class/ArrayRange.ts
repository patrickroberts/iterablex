import type BidirectionalRange from '../abstract/BidirectionalRange.js';
import type ForwardRange from '../abstract/ForwardRange.js';
import RandomAccessRange from '../abstract/RandomAccessRange.js';
import type Range from '../interface/Range.js';
import type TypedArray from '../interface/TypedArray.js';
import flatMap from '../operators/flatMap.js';
import scan from '../operators/scan.js';
import toSorted from '../operators/toSorted.js';
import GeneratorRange from './GeneratorRange.js';
import ReversibleRange from './ReversibleRange.js';

export default class ArrayRange<T, U> extends RandomAccessRange<U> {
  readonly #array: RandomAccessRange<T> | T[] | TypedArray<T>;
  readonly #transform: (value: T, index: number) => U;
  readonly #begin: number;
  readonly #end: number;

  public constructor(array: RandomAccessRange<T> | T[] | TypedArray<T>, transform: (value: T, index: number) => U, begin = 0, end = array.length) {
    super();
    this.#array = array;
    this.#transform = transform;
    this.#begin = begin;
    this.#end = end;
  }

  public *[Symbol.iterator](): IterableIterator<U> {
    const increment = Math.sign(this.#end - this.#begin);

    for (let index = 0; index < this.length; index += 1) {
      yield this.#transform(this.#array.at(this.#begin + index * increment)!, index);
    }
  }

  public at(index: number): U | undefined {
    if (index >= 0 && index < this.length) {
      const increment = Math.sign(this.#end - this.#begin);

      return this.#transform(this.#array.at(this.#begin + index * increment)!, index);
    }
  }

  public drop(count: number): RandomAccessRange<U> {
    return this.slice(count);
  }

  public entries(): RandomAccessRange<[number, U]> {
    return this.map((value, index) => [index, value]);
  }

  public filter(callbackFn: (value: U, index: number) => boolean): BidirectionalRange<U> {
    return new ReversibleRange(this, (value: U, index: number) => callbackFn(value, index) ? [value] : []);
  }

  public flatMap<V>(callbackFn: (value: U, index: number) => Iterable<V>): ForwardRange<V> {
    return GeneratorRange.from(() => flatMap(this, callbackFn));
  }

  public get length(): number {
    return Math.abs(this.#end - this.#begin);
  }

  public map<V>(callbackFn: (value: U, index: number) => V): RandomAccessRange<V> {
    return new ArrayRange(this, (value: U, index: number) => callbackFn(value, index));
  }

  public scan<V>(callbackFn: (accumulator: U | V, value: U, index: number) => U | V, ...initialValue: [] | [U | V]): ForwardRange<U | V> {
    return GeneratorRange.from(() => scan(this, callbackFn, ...initialValue));
  }

  public slice(begin?: number, end?: number): RandomAccessRange<U> {
    return new ArrayRange(this, (value: U) => value, begin, end);
  }

  public take(count: number): RandomAccessRange<U> {
    return this.slice(0, count);
  }

  public toReversed(): RandomAccessRange<U> {
    return new ArrayRange(this, (value: U) => value, this.length - 1, -1);
  }

  public toSorted(compareFn?: (a: U, b: U) => number): ForwardRange<U> {
    return GeneratorRange.from(() => toSorted(this, compareFn));
  }
}
