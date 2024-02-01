import drop from './drop.js';
import take from './take.js';

export default function slice<T>(
  iterable: Iterable<T>, begin: number = 0, end: number = Infinity,
): Generator<T> {
  const takeUntilEnd = take(iterable, end);
  return begin === 0 ? takeUntilEnd : drop(takeUntilEnd, begin);
}
