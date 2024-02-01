import BidirectionalIterable from '../abstract/BidirectionalIterable.js';
import ForwardIterable from '../abstract/ForwardIterable.js';
import drop from '../operators/drop.js';
import flatMap from '../operators/flatMap.js';
import scan from '../operators/scan.js';
import slice from '../operators/slice.js';
import take from '../operators/take.js';
import toSorted from '../operators/toSorted.js';
import GeneratorIterable from './GeneratorIterable.js';

export default class ReversibleIterable<T, U> extends BidirectionalIterable<U> {
  readonly #bidirectional: BidirectionalIterable<T>;
  readonly #flatMap: (value: T, index: number) => Iterable<U>;

  public constructor(bidirectional: BidirectionalIterable<T>, flatMap: (value: T, index: number) => Iterable<U>) {
    super();
    this.#bidirectional = bidirectional;
    this.#flatMap = flatMap;
  }

  public [Symbol.iterator](): IterableIterator<U> {
    return flatMap(this.#bidirectional, this.#flatMap);
  }

  public drop(count: number): ForwardIterable<U> {
    return GeneratorIterable.from(() => drop(this, count))
  }

  public entries(): BidirectionalIterable<[number, U]> {
    return this.map((value, index) => [index, value]);
  }

  public filter(callbackFn: (value: U, index: number) => boolean): BidirectionalIterable<U> {
    return new ReversibleIterable(this, (value: U, index: number) => callbackFn(value, index) ? [value] : []);
  }

  public flatMap<V>(callbackFn: (value: U, index: number) => Iterable<V>): ForwardIterable<V> {
    return GeneratorIterable.from(() => flatMap(this, callbackFn));
  }

  public map<V>(callbackFn: (value: U, index: number) => V): BidirectionalIterable<V> {
    return new ReversibleIterable(this, (value: U, index: number) => [callbackFn(value, index)]);
  }

  public scan<V>(callbackFn: (accumulator: U | V, value: U, index: number) => U | V, ...initialValue: [] | [U | V]): ForwardIterable<U | V> {
    return GeneratorIterable.from(() => scan(this, callbackFn, ...initialValue));
  }

  public slice(begin?: number, end?: number): ForwardIterable<U> {
    return GeneratorIterable.from(() => slice(this, begin, end));
  }

  public take(count: number): ForwardIterable<U> {
    return GeneratorIterable.from(() => take(this, count));
  }

  public toReversed(): BidirectionalIterable<U> {
    return new ReversibleIterable(this.#bidirectional.toReversed(), this.#flatMap);
  }

  public toSorted(compareFn?: (a: U, b: U) => number): ForwardIterable<U> {
    return GeneratorIterable.from(() => toSorted(this, compareFn));
  }
}
