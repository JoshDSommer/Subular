import { tap, map, switchMap, delay, combineAll } from 'rxjs/operators';
import { of, concat, zip, Observable } from 'rxjs';

const placeholderSong = {
  placeholder: true
} as any;
const PLACEHOLDER_VALUES = [
  placeholderSong,
  placeholderSong,
  placeholderSong,
  placeholderSong,
  placeholderSong,
  placeholderSong,
  placeholderSong,
  placeholderSong,
  placeholderSong,
  placeholderSong,
  placeholderSong,
  placeholderSong,
  placeholderSong,
  placeholderSong,
  placeholderSong,
  placeholderSong,
  placeholderSong
];

export const popIn = switchMap((items: any[]) => {
  if (
    (items[1] && items[1].placeholder) ||
    (items[1][1] && items[1][1].placeholder)
  ) {
    return of([items[0], ...PLACEHOLDER_VALUES]);
  }
  const delayTime = delay(60);
  const oneSet$ = of([items[0], ...PLACEHOLDER_VALUES.slice(0, items.length)]);

  const getItems = (count, items: any[]) =>
    of(items.length >= count, [
      ...items.slice(0, count),
      ...(items.length == count
        ? []
        : PLACEHOLDER_VALUES.slice(count, items.length))
    ]).pipe(delayTime);

  return concat(
    oneSet$,
    getItems(1, items),
    getItems(2, items),
    getItems(3, items),
    getItems(4, items),
    getItems(5, items),
    getItems(6, items),
    getItems(7, items),
    getItems(8, items),
    getItems(9, items),
    getItems(10, items),
    getItems(11, items),
    of(items)
  ) as Observable<any>;
});
