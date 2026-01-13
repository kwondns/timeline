import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { ensureDate } from '@/lib/utils/date/ensureDate';
import { differenceInMinutes } from 'date-fns/differenceInMinutes';

export const calculateDifferenceInMinutes = (start: Date | string, end: Date | string) =>
  pipe(
    [start, end],
    O.traverseArray(ensureDate),
    O.map(([start, end]) => differenceInMinutes(end, start)),
  );
