import type BidirectionalIterable from '../abstract/BidirectionalIterable.js';
import ContiguousIterable from '../abstract/ContiguousIterable.js';
import type ForwardIterable from '../abstract/ForwardIterable.js';
import type RandomAccessIterable from '../abstract/RandomAccessIterable.js';
import type BasicIterable from '../interface/BasicIterable.js';
import type TypedArray from '../interface/TypedArray.js';
import flatMap from '../operators/flatMap.js';
import scan from '../operators/scan.js';
import toSorted from '../operators/toSorted.js';
import ArrayIterable from './ArrayIterable.js';
import GeneratorIterable from './GeneratorIterable.js';
import ReversibleIterable from './ReversibleIterable.js';

export default class TypedArrayIterable<T> extends ContiguousIterable<T> {
  readonly #typedArray: Extract<TypedArray, BasicIterable<T>>;

  public constructor(typedArray: Extract<TypedArray, BasicIterable<T>>) {
    super();
    this.#typedArray = typedArray;
  }

  public [Symbol.iterator](): IterableIterator<T> {
    return this.#typedArray[Symbol.iterator]();
  }

  public at(index: number): T | undefined {
    return this.#typedArray.at(index) as T | undefined;
  }

  public drop(count: number): ContiguousIterable<T> {
    return this.slice(count);
  }

  public entries(): RandomAccessIterable<[number, T]> {
    return this.map((value, index) => [index, value]);
  }

  public filter(callbackFn: (value: T, index: number) => boolean): BidirectionalIterable<T> {
    return new ReversibleIterable(this, (value: T, index: number) => callbackFn(value, index) ? [value] : []);
  }

  public flatMap<U>(callbackFn: (value: T, index: number) => Iterable<U>): ForwardIterable<U> {
    return GeneratorIterable.from(() => flatMap(this, callbackFn));
  }

  public get length(): number {
    return this.#typedArray.length;
  }

  public map<U>(callbackFn: (value: T, index: number) => U): RandomAccessIterable<U> {
    return new ArrayIterable(this.#typedArray, callbackFn);
  }

  public scan<U>(callbackFn: (accumulator: T | U, value: T, index: number) => T | U, ...initialValue: [] | [T | U]): ForwardIterable<T | U> {
    return GeneratorIterable.from(() => scan(this, callbackFn, ...initialValue));
  }

  public slice(begin?: number, end?: number): ContiguousIterable<T> {
    return new TypedArrayIterable<T>(this.#typedArray.subarray(begin, end) as Extract<TypedArray, BasicIterable<T>>);
  }

  public take(count: number): ContiguousIterable<T> {
    return this.slice(0, count);
  }

  public toReversed(): RandomAccessIterable<T> {
    return new ArrayIterable(this.#typedArray, value => value, this.length - 1, -1);
  }

  public toSorted(compareFn?: ((a: T, b: T) => number) | undefined): ForwardIterable<T> {
    return GeneratorIterable.from(() => toSorted(this, compareFn));
  }

  public every(callbackFn: (value: T, index: number) => boolean): boolean {
    return (this.#typedArray as unknown as T[]).every(callbackFn);
  }

  public find(callbackFn: (value: T, index: number) => boolean): T | undefined {
    return (this.#typedArray as unknown as T[]).find(callbackFn);
  }

  public findIndex(callbackFn: (value: T, index: number) => boolean): number {
    return (this.#typedArray as unknown as T[]).findIndex(callbackFn);
  }

  public findLast(callbackFn: (value: T, index: number) => boolean): T | undefined {
    return (this.#typedArray as unknown as T[]).findLast(callbackFn);
  }

  public findLastIndex(callbackFn: (value: T, index: number) => boolean): number {
    return (this.#typedArray as unknown as T[]).findLastIndex(callbackFn);
  }

  public forEach(callbackFn: (value: T, index: number) => void): void {
    return (this.#typedArray as unknown as T[]).forEach(callbackFn);
  }

  public includes(searchElement: T, fromIndex: number): boolean {
    return (this.#typedArray as unknown as T[]).includes(searchElement, fromIndex);
  }

  public indexOf(searchElement: T, fromIndex: number): number {
    return (this.#typedArray as unknown as T[]).indexOf(searchElement, fromIndex);
  }

  public lastIndexOf(searchElement: T, fromIndex: number): number {
    return (this.#typedArray as unknown as T[]).lastIndexOf(searchElement, fromIndex);
  }

  public reduce<U>(callbackFn: (accumulator: T | U, value: T, index: number) => T | U, ...initialValue: [T | U]): T | U {
    return (this.#typedArray as unknown as T[]).reduce(callbackFn, ...initialValue);
  }

  public reduceRight<U>(callbackFn: (accumulator: T | U, value: T, index: number) => T | U, ...initialValue: [T | U]): T | U {
    return (this.#typedArray as unknown as T[]).reduceRight(callbackFn, ...initialValue);
  }

  public some(callbackFn: (value: T, index: number) => boolean): boolean {
    return (this.#typedArray as unknown as T[]).some(callbackFn);
  }
}
