import type BidirectionalRange from '../abstract/BidirectionalRange.js';
import ContiguousRange from '../abstract/ContiguousRange.js';
import type ForwardRange from '../abstract/ForwardRange.js';
import type RandomAccessRange from '../abstract/RandomAccessRange.js';
import type Range from '../interface/Range.js';
import type TypedArray from '../interface/TypedArray.js';
import flatMap from '../operators/flatMap.js';
import scan from '../operators/scan.js';
import toSorted from '../operators/toSorted.js';
import ArrayRange from './ArrayRange.js';
import GeneratorRange from './GeneratorRange.js';
import ReversibleRange from './ReversibleRange.js';

export default class TypedArrayRange<T> extends ContiguousRange<T> {
  readonly #typedArray: TypedArray<T>;

  public constructor(typedArray: TypedArray<T>) {
    super();
    this.#typedArray = typedArray;
  }

  public [Symbol.iterator](): IterableIterator<T> {
    return this.#typedArray[Symbol.iterator]();
  }

  public at(index: number): T | undefined {
    return this.#typedArray.at(index);
  }

  public drop(count: number): ContiguousRange<T> {
    return this.slice(count);
  }

  public entries(): RandomAccessRange<[number, T]> {
    return this.map((value, index) => [index, value]);
  }

  public filter(callbackFn: (value: T, index: number) => boolean): BidirectionalRange<T> {
    return new ReversibleRange(this, (value: T, index: number) => callbackFn(value, index) ? [value] : []);
  }

  public flatMap<U>(callbackFn: (value: T, index: number) => Iterable<U>): ForwardRange<U> {
    return GeneratorRange.from(() => flatMap(this, callbackFn));
  }

  public get length(): number {
    return this.#typedArray.length;
  }

  public map<U>(callbackFn: (value: T, index: number) => U): RandomAccessRange<U> {
    return new ArrayRange(this.#typedArray, callbackFn);
  }

  public scan<U>(callbackFn: (accumulator: T | U, value: T, index: number) => T | U, ...initialValue: [] | [T | U]): ForwardRange<T | U> {
    return GeneratorRange.from(() => scan(this, callbackFn, ...initialValue));
  }

  public slice(begin?: number, end?: number): ContiguousRange<T> {
    return new TypedArrayRange<T>(this.#typedArray.subarray(begin, end));
  }

  public take(count: number): ContiguousRange<T> {
    return this.slice(0, count);
  }

  public toReversed(): RandomAccessRange<T> {
    return new ArrayRange(this.#typedArray, value => value, this.length - 1, -1);
  }

  public toSorted(compareFn?: ((a: T, b: T) => number) | undefined): ForwardRange<T> {
    return GeneratorRange.from(() => toSorted(this, compareFn));
  }

  public every(callbackFn: (value: T, index: number) => boolean): boolean {
    return this.#typedArray.every(callbackFn);
  }

  public find(callbackFn: (value: T, index: number) => boolean): T | undefined {
    return this.#typedArray.find(callbackFn);
  }

  public findIndex(callbackFn: (value: T, index: number) => boolean): number {
    return this.#typedArray.findIndex(callbackFn);
  }

  public findLast(callbackFn: (value: T, index: number) => boolean): T | undefined {
    return this.#typedArray.findLast(callbackFn);
  }

  public findLastIndex(callbackFn: (value: T, index: number) => boolean): number {
    return this.#typedArray.findLastIndex(callbackFn);
  }

  public forEach(callbackFn: (value: T, index: number) => void): void {
    return this.#typedArray.forEach(callbackFn);
  }

  public includes(searchElement: T, fromIndex: number): boolean {
    return this.#typedArray.includes(searchElement, fromIndex);
  }

  public indexOf(searchElement: T, fromIndex: number): number {
    return this.#typedArray.indexOf(searchElement, fromIndex);
  }

  public lastIndexOf(searchElement: T, fromIndex: number): number {
    return this.#typedArray.lastIndexOf(searchElement, fromIndex);
  }

  public reduce<U>(callbackFn: (accumulator: T | U, value: T, index: number) => T | U, ...initialValue: [T | U]): T | U {
    return this.#typedArray.reduce(callbackFn, ...initialValue);
  }

  public reduceRight<U>(callbackFn: (accumulator: T | U, value: T, index: number) => T | U, ...initialValue: [T | U]): T | U {
    return this.#typedArray.reduceRight(callbackFn, ...initialValue);
  }

  public some(callbackFn: (value: T, index: number) => boolean): boolean {
    return this.#typedArray.some(callbackFn);
  }
}
