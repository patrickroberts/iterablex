import type BidirectionalRange from './abstract/BidirectionalRange.js';
import type ContiguousRange from './abstract/ContiguousRange.js';
import type ForwardRange from './abstract/ForwardRange.js';
import InputRange from './abstract/InputRange.js';
import type RandomAccessRange from './abstract/RandomAccessRange.js';
import ArrayRange from './class/ArrayRange.js';
import GeneratorRange from './class/GeneratorRange.js';
import IteratorRange from './class/IteratorRange.js';
import TypedArrayRange from './class/TypedArrayRange.js';
import type Range from './interface/Range.js';
import type TypedArray from './interface/TypedArray.js';

function lazily<T>(contiguous: ContiguousRange<T> | TypedArray<T>): ContiguousRange<T>;
function lazily<T>(array: RandomAccessRange<T> | T[]): RandomAccessRange<T>;
function lazily(string: string): RandomAccessRange<string>;
function lazily<T>(bidirectional: BidirectionalRange<T>): BidirectionalRange<T>;
function lazily<T>(forward: ForwardRange<T> | Set<T>): ForwardRange<T>;
function lazily<K, V>(map: Map<K, V>): ForwardRange<[K, V]>;
function lazily<T>(input: InputRange<T> | Generator<T>): InputRange<T>;
function lazily<T>(range: Range<T>): Range<T> {
  if (range instanceof InputRange) {
    return range;
  }

  if (range instanceof Object.getPrototypeOf(Uint8Array)) {
    return new TypedArrayRange(range as TypedArray<T>);
  }

  if (Array.isArray(range) || typeof range === 'string') {
    return new ArrayRange(range, value => value);
  }

  if ('next' in Object(range) && typeof Object(range).next === 'function') {
    return new IteratorRange(range as IterableIterator<T>);
  }

  return new GeneratorRange(range);
}

export default lazily;
