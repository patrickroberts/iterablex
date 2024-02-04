import BidirectionalRange from '../abstract/BidirectionalRange.js';
import ForwardRange from '../abstract/ForwardRange.js';
import drop from '../operators/drop.js';
import flatMap from '../operators/flatMap.js';
import scan from '../operators/scan.js';
import slice from '../operators/slice.js';
import take from '../operators/take.js';
import toSorted from '../operators/toSorted.js';
import GeneratorRange from './GeneratorRange.js';

export default class ReversibleRange<T, U> extends BidirectionalRange<U> {
  readonly #bidirectional: BidirectionalRange<T>;
  readonly #flatMap: (value: T, index: number) => Iterable<U>;

  public constructor(bidirectional: BidirectionalRange<T>, flatMap: (value: T, index: number) => Iterable<U>) {
    super();
    this.#bidirectional = bidirectional;
    this.#flatMap = flatMap;
  }

  public [Symbol.iterator](): IterableIterator<U> {
    return flatMap(this.#bidirectional, this.#flatMap);
  }

  public drop(count: number): ForwardRange<U> {
    return GeneratorRange.from(() => drop(this, count))
  }

  public entries(): BidirectionalRange<[number, U]> {
    return this.map((value, index) => [index, value]);
  }

  public filter(callbackFn: (value: U, index: number) => boolean): BidirectionalRange<U> {
    return new ReversibleRange(this, (value: U, index: number) => callbackFn(value, index) ? [value] : []);
  }

  public flatMap<V>(callbackFn: (value: U, index: number) => Iterable<V>): ForwardRange<V> {
    return GeneratorRange.from(() => flatMap(this, callbackFn));
  }

  public map<V>(callbackFn: (value: U, index: number) => V): BidirectionalRange<V> {
    return new ReversibleRange(this, (value: U, index: number) => [callbackFn(value, index)]);
  }

  public scan<V>(callbackFn: (accumulator: U | V, value: U, index: number) => U | V, ...initialValue: [] | [U | V]): ForwardRange<U | V> {
    return GeneratorRange.from(() => scan(this, callbackFn, ...initialValue));
  }

  public slice(begin?: number, end?: number): ForwardRange<U> {
    return GeneratorRange.from(() => slice(this, begin, end));
  }

  public take(count: number): ForwardRange<U> {
    return GeneratorRange.from(() => take(this, count));
  }

  public toReversed(): BidirectionalRange<U> {
    return new ReversibleRange(this.#bidirectional.toReversed(), this.#flatMap);
  }

  public toSorted(compareFn?: (a: U, b: U) => number): ForwardRange<U> {
    return GeneratorRange.from(() => toSorted(this, compareFn));
  }
}
