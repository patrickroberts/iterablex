import type BasicIterable from '../interface/BasicIterable.js';
import at from '../operators/at.js';
import every from '../operators/every.js';
import find from '../operators/find.js';
import findIndex from '../operators/findIndex.js';
import findLast from '../operators/findLast.js';
import findLastIndex from '../operators/findLastIndex.js';
import first from '../operators/first.js';
import forEach from '../operators/forEach.js';
import includes from '../operators/includes.js';
import indexOf from '../operators/indexOf.js';
import last from '../operators/last.js';
import lastIndexOf from '../operators/lastIndexOf.js';
import reduce from '../operators/reduce.js';
import some from '../operators/some.js';

export default abstract class InputIterable<T> implements BasicIterable<T> {
  public abstract [Symbol.iterator](): IterableIterator<T>;

  public abstract drop(count: number): InputIterable<T>;

  public abstract entries(): InputIterable<[number, T]>;

  public abstract filter<S extends T>(callbackFn: (value: T, index: number) => value is S): InputIterable<S>;
  public abstract filter(callbackFn: (value: T, index: number) => boolean): InputIterable<T>;

  public abstract flatMap<U>(callbackFn: (value: T, index: number) => Iterable<U>): InputIterable<U>;

  public abstract map<U>(callbackFn: (value: T, index: number) => U): InputIterable<U>;

  public abstract scan<U>(callbackFn: (accumulator: U, value: T, index: number) => U, initialValue: U): InputIterable<U>;
  public abstract scan(callbackFn: (accumulator: T, value: T, index: number) => T, ...initialValue: [] | [T]): InputIterable<T>;

  public abstract slice(begin?: number, end?: number): InputIterable<T>;

  public abstract take(count: number): InputIterable<T>;

  public abstract toReversed(): InputIterable<T>;

  public abstract toSorted(compareFn?: (a: T, b: T) => number): InputIterable<T>;

  public at(index: number): T | undefined {
    return at(this, index);
  }

  public every<S extends T>(callbackFn: (value: T, index: number) => value is S): this is BasicIterable<S>;
  public every(callbackFn: (value: T, index: number) => boolean): boolean;
  public every(callbackFn: (value: T, index: number) => boolean): boolean {
    return every(this, callbackFn);
  }

  public some(callbackFn: (value: T, index: number) => boolean): boolean {
    return some(this, callbackFn);
  }

  public find<S extends T>(callbackFn: (value: T, index: number) => value is S): S | undefined;
  public find(callbackFn: (value: T, index: number) => boolean): T | undefined;
  public find(callbackFn: (value: T, index: number) => boolean): T | undefined {
    return find(this, callbackFn);
  }

  public findLast<S extends T>(callbackFn: (value: T, index: number) => value is S): S | undefined;
  public findLast(callbackFn: (value: T, index: number) => boolean): T | undefined;
  public findLast(callbackFn: (value: T, index: number) => boolean): T | undefined {
    return findLast(this, callbackFn);
  }

  public findIndex(callbackFn: (value: T, index: number) => boolean): number {
    return findIndex(this, callbackFn);
  }

  public findLastIndex(callbackFn: (value: T, index: number) => boolean): number {
    return findLastIndex(this, callbackFn);
  }

  public first<S extends T>(callbackFn?: (value: T, index: number) => value is S): S | undefined
  public first(callbackFn?: (value: T, index: number) => boolean): T | undefined;
  public first(callbackFn?: (value: T, index: number) => boolean): T | undefined {
    return first(this, callbackFn);
  }

  public forEach(callbackFn: (value: T, index: number) => void): void {
    return forEach(this, callbackFn);
  }

  public includes(searchElement: T, fromIndex = 0): boolean {
    return includes(this, searchElement, fromIndex);
  }

  public indexOf(searchElement: T, fromIndex = 0): number {
    return indexOf(this, searchElement, fromIndex);
  }

  public last<S extends T>(callbackFn?: (value: T, index: number) => value is S): S | undefined
  public last(callbackFn?: (value: T, index: number) => boolean): T | undefined;
  public last(callbackFn?: (value: T, index: number) => boolean): T | undefined {
    return last(this, callbackFn);
  }

  public lastIndexOf(searchElement: T, fromIndex = 0): number {
    return lastIndexOf(this, searchElement, fromIndex);
  }

  public reduce<U>(callbackFn: (accumulator: U, value: T, index: number) => U, initialValue: U): U;
  public reduce(callbackFn: (accumulator: T, value: T, index: number) => T, ...initialValue: [] | [T]): T;
  public reduce<U>(callbackFn: (accumulator: T | U, value: T, index: number) => T | U, ...initialValue: [] | [T | U]): T | U {
    return reduce(this, callbackFn, ...initialValue);
  }

  public reduceRight<U>(callbackFn: (accumulator: U, value: T, index: number) => U, initialValue: U): U;
  public reduceRight(callbackFn: (accumulator: T, value: T, index: number) => T, ...initialValue: [] | [T]): T;
  public reduceRight<U>(callbackFn: (accumulator: T | U, value: T, index: number) => T | U, ...initialValue: [] | [T | U]): T | U {
    return this.toArray().reduceRight(callbackFn, ...initialValue as [T | U]);
  }

  public toArray(): T[] {
    return [...this];
  }
}
