export default function at<T>(
  iterable: Iterable<T>, index: number,
): T | undefined {
  let currentIndex = 0;

  for (const value of iterable) {
    if (index === currentIndex) {
      return value;
    }

    currentIndex += 1;
  }
}
