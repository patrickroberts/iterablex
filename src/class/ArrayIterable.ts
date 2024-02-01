import type BidirectionalIterable from '../abstract/BidirectionalIterable.js';
import type ForwardIterable from '../abstract/ForwardIterable.js';
import RandomAccessIterable from '../abstract/RandomAccessIterable.js';
import type BasicIterable from '../interface/BasicIterable.js';
import type TypedArray from '../interface/TypedArray.js';
import flatMap from '../operators/flatMap.js';
import scan from '../operators/scan.js';
import toSorted from '../operators/toSorted.js';
import GeneratorIterable from './GeneratorIterable.js';
import ReversibleIterable from './ReversibleIterable.js';

export default class ArrayIterable<T, U> extends RandomAccessIterable<U> {
  readonly #array: Extract<T[] | string | TypedArray | RandomAccessIterable<T>, BasicIterable<T>>;
  readonly #transform: (value: T, index: number) => U;
  readonly #begin: number;
  readonly #end: number;

  public constructor(array: Extract<T[] | string | TypedArray | RandomAccessIterable<T>, BasicIterable<T>>, transform: (value: T, index: number) => U, begin = 0, end = array.length) {
    super();
    this.#array = array;
    this.#transform = transform;
    this.#begin = begin;
    this.#end = end;
  }

  public *[Symbol.iterator](): IterableIterator<U> {
    const increment = Math.sign(this.#end - this.#begin);

    for (let index = 0; index < this.length; index += 1) {
      yield this.#transform(this.#array.at(this.#begin + index * increment) as T, index);
    }
  }

  public at(index: number): U | undefined {
    if (index >= 0 && index < this.length) {
      const increment = Math.sign(this.#end - this.#begin);

      return this.#transform(this.#array.at(this.#begin + index * increment) as T, index);
    }
  }

  public drop(count: number): RandomAccessIterable<U> {
    return this.slice(count);
  }

  public entries(): RandomAccessIterable<[number, U]> {
    return this.map((value, index) => [index, value]);
  }

  public filter(callbackFn: (value: U, index: number) => boolean): BidirectionalIterable<U> {
    return new ReversibleIterable(this, (value: U, index: number) => callbackFn(value, index) ? [value] : []);
  }

  public flatMap<V>(callbackFn: (value: U, index: number) => Iterable<V>): ForwardIterable<V> {
    return GeneratorIterable.from(() => flatMap(this, callbackFn));
  }

  public get length(): number {
    return Math.abs(this.#end - this.#begin);
  }

  public map<V>(callbackFn: (value: U, index: number) => V): RandomAccessIterable<V> {
    return new ArrayIterable(this, (value: U, index: number) => callbackFn(value, index));
  }

  public scan<V>(callbackFn: (accumulator: U | V, value: U, index: number) => U | V, ...initialValue: [] | [U | V]): ForwardIterable<U | V> {
    return GeneratorIterable.from(() => scan(this, callbackFn, ...initialValue));
  }

  public slice(begin?: number, end?: number): RandomAccessIterable<U> {
    return new ArrayIterable(this, (value: U) => value, begin, end);
  }

  public take(count: number): RandomAccessIterable<U> {
    return this.slice(0, count);
  }

  public toReversed(): RandomAccessIterable<U> {
    return new ArrayIterable(this, (value: U) => value, this.length - 1, -1);
  }

  public toSorted(compareFn?: (a: U, b: U) => number): ForwardIterable<U> {
    return GeneratorIterable.from(() => toSorted(this, compareFn));
  }
}
