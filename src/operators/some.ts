import findIndex from './findIndex.js';

export default function some<T>(
  iterable: Iterable<T>, callbackFn: (value: T, index: number) => boolean,
): boolean {
  return findIndex(iterable, callbackFn) !== -1;
}
