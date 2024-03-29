# iterablex

Lazy method chaining iterables

## About

This library exports a function to create a lazy iterable from any [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol). The return value's type will depend on what operations the original iterable supports:

- A `ContiguousRange` for any [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
- A `RandomAccessRange` for any iterable not above implementing a constant-time `.at(index)` method
- A `ForwardRange` for any iterable not above that can be iterated without consuming the input
- An `InputRange` for any other iterable not above

A `BidirectionalRange` may be returned by some of the lazy methods for `ContiguousRange`, `RandomAccessRange`, and itself, to indicate the returned iterable supports lazy `.toReversed()` without buffering.

## Lazy methods:

- `.drop(count: number)`
- `.entries()`
- `.filter(predicate: (value, index) => boolean)`
- `.flatMap(callback: (value, index) => iterable)`
- `.map(callback: (value, index) => any)`
- `.scan(callback: (previous, value, index) => next, initial?)`
- `.slice(begin?, end?)`
- `.take(count: number)`
- `.toReversed()`
- `.toSorted(compare?: (a, b) => number)`

## Eager methods:

- `.at(index: number): value?`
- `.every(predicate: (value, index) => boolean): boolean`
- `.find(predicate: (value, index) => boolean): value?`
- `.findIndex(predicate: (value, index) => boolean): number`
- `.findLast(predicate: (value, index) => boolean): value?`
- `.findLastIndex(predicate: (value, index) => boolean): number`
- `.first(predicate?: (value, index) => boolean): value?`
- `.forEach(callback: (value, index) => void): void`
- `.includes(value, fromIndex?: number): boolean`
- `.indexOf(value, fromIndex?: number): number`
- `.last(predicate?: (value, index) => boolean): value?`
- `.lastIndexOf(value, fromIndex?: number): number`
- `.reduce(callback: (previous, value, index) => next, initial?)`
- `.some(predicate: (value, index) => boolean): boolean`
- `.toArray(): array`

...and more to come!

## TODO

- Tests (and bugfixes)
- More documentation
- More methods
