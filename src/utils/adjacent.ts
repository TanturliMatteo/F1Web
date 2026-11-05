// The items just before and after the first one matching `isCurrent`,
// e.g. the previous / next driver in the standings or race in the calendar
export function adjacent<T>(
  items: T[] | undefined,
  isCurrent: (item: T) => boolean,
) {
  const index = items?.findIndex(isCurrent) ?? -1;
  if (!items || index < 0) return { prev: undefined, next: undefined };
  return { prev: items[index - 1], next: items[index + 1] };
}
