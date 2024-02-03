export interface FullDate {
  year: number;
  month: number;
  day: number;
}

export const ONE_DAY_IN_MILLISECONDS = 86400000;

export function convertToJSDate(fullDate: string) {
  const parts = fullDate.split('-').map((x) => +x);
  return new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
}

export function getLocaleDateString(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
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

export function formatDateComponent(
  date: Date,
  locale: string,
  component: string,
  format: string
) {
  return new Intl.DateTimeFormat(locale, {
    calendar: 'gregory',
    timeZone: 'UTC',
    [component]: format
  }).format(date);
}
