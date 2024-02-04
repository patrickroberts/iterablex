export default interface TypedArray<T> {
  [Symbol.iterator](): IterableIterator<T>;
  at(index: number): T | undefined;
  every<S extends T>(predicate: (value: T, index: number) => value is S): this is S[];
  every(predicate: (value: T, index: number) => boolean): boolean;
  find<S extends T>(predicate: (value: T, index: number) => value is S): S | undefined;
  find(predicate: (value: T, index: number) => boolean): T | undefined;
  findIndex(predicate: (value: T, index: number) => boolean): number;
  findLast<S extends T>(predicate: (value: T, index: number) => value is S): S | undefined;
  findLast(predicate: (value: T, index: number) => boolean): T | undefined;
  findLastIndex(predicate: (value: T, index: number) => boolean): number;
  forEach(callbackfn: (value: T, index: number) => void): void;
  includes(searchElement: T, fromIndex?: number): boolean;
  indexOf(searchElement: T, fromIndex?: number): number;
  lastIndexOf(searchElement: T, fromIndex?: number): number;
  readonly length: number;
  reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number) => T): T;
  reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number) => U, initialValue: U): U;
  reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number) => T): T;
  reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number) => U, initialValue: U): U;
  some(predicate: (value: T, index: number) => boolean): boolean;
  subarray(begin?: number, end?: number): TypedArray<T>;
}
