import type BidirectionalIterable from './abstract/BidirectionalIterable.js';
import type ContiguousIterable from './abstract/ContiguousIterable.js';
import type ForwardIterable from './abstract/ForwardIterable.js';
import InputIterable from './abstract/InputIterable.js';
import type RandomAccessIterable from './abstract/RandomAccessIterable.js';
import ArrayIterable from './class/ArrayIterable.js';
import GeneratorIterable from './class/GeneratorIterable.js';
import IteratorIterable from './class/IteratorIterable.js';
import TypedArrayIterable from './class/TypedArrayIterable.js';
import type BasicIterable from './interface/BasicIterable.js';
import type TypedArray from './interface/TypedArray.js';

function lazily<T>(contiguous: ContiguousIterable<T>): ContiguousIterable<T>;
function lazily<T>(randomAccess: RandomAccessIterable<T>): RandomAccessIterable<T>;
function lazily<T>(bidirectional: BidirectionalIterable<T>): BidirectionalIterable<T>;
function lazily<T>(forward: ForwardIterable<T>): ForwardIterable<T>;
function lazily<T>(input: InputIterable<T>): InputIterable<T>;
function lazily<T>(typedArray: BigInt64Array | BigUint64Array): ContiguousIterable<bigint>;
function lazily<T>(typedArray: Float32Array | Float64Array | Int16Array | Int32Array | Int8Array | Uint16Array | Uint32Array | Uint8Array | Uint8ClampedArray): ContiguousIterable<number>;
function lazily<T>(array: T[]): RandomAccessIterable<T>;
function lazily<T>(string: string): RandomAccessIterable<string>;
function lazily<K, V>(map: Map<K, V>): ForwardIterable<[K, V]>;
function lazily<T>(set: Set<T>): ForwardIterable<T>;
function lazily<T>(generator: Generator<T>): InputIterable<T>;
function lazily<T>(iterable: BasicIterable<T>): BasicIterable<T> {
  if (iterable instanceof InputIterable) {
    return iterable;
  }

  if (iterable instanceof Object.getPrototypeOf(Uint8Array)) {
    return new TypedArrayIterable(iterable as Extract<TypedArray, BasicIterable<T>>);
  }

  if (Array.isArray(iterable) || typeof iterable === 'string') {
    return new ArrayIterable(iterable as T[], value => value);
  }

  if ('next' in Object(iterable) && typeof Object(iterable).next === 'function') {
    return new IteratorIterable(iterable as IterableIterator<T>);
  }

  return new GeneratorIterable(iterable);
}

export default lazily;
