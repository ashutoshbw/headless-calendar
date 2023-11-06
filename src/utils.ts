interface FormatOptions {
  locale: string;
  format: 'long' | 'short' | 'narrow';
}

export type FullDate = number[];

export const ONE_DAY_IN_MILLISECONDS = 86400000;
export const DEFAULT_LOCALE = 'en-US';
export const DEFAULT_START_WEEKDAY_INDEX = 0;

export function convertToJSDate(fullDate: FullDate) {
  const [year, month, date] = fullDate;
  return new Date(Date.UTC(year, month - 1, date));
}

export function getLocaleDateArray(date: Date) {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
}

// This function assumes its input dates's time part having
// 0 minutes 0 seconds and 0 milliseconds. This is equivaleant
// as the output of convertToJSDate function.
export function getCoverage(dateA: Date, dateB: Date) {
  return (
    Math.abs(dateA.getTime() - dateB.getTime()) / ONE_DAY_IN_MILLISECONDS + 1
  );
}

export function getRelativeWeekdayIndex(date: Date, startWeekdayIndex: number) {
  // where Sunday is 0, Monday is 1 and so on
  const dayIndex = date.getUTCDay();

  return (dayIndex >= startWeekdayIndex ? 0 : 7) + dayIndex - startWeekdayIndex;
}

export function getMaxWeekIndex(
  startDate: Date,
  endDate: Date,
  startWeekdayIndex: number
) {
  const dayIndex = getRelativeWeekdayIndex(startDate, startWeekdayIndex);

  const length = getCoverage(startDate, endDate);
  return Math.ceil((dayIndex + length) / 7) - 1;
}

export function getDayNameOf(date: Date, { locale, format }: FormatOptions) {
  const formatter = new Intl.DateTimeFormat(locale, {
    weekday: format,
    timeZone: 'UTC'
  });
  return formatter.format(date);
}

export function getMonthNameOf(date: Date, { locale, format }: FormatOptions) {
  const formatter = new Intl.DateTimeFormat(locale, {
    month: format,
    timeZone: 'UTC'
  });
  return formatter.format(date);
}
