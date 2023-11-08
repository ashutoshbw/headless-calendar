import {
  FullDate,
  ONE_DAY_IN_MILLISECONDS,
  DEFAULT_LOCALE,
  DEFAULT_START_WEEKDAY_INDEX,
  convertToJSDate,
  getCoverage,
  getRelativeWeekdayIndex,
  getMaxWeekIndex,
  getLocaleDateArray,
  formatDateComponent
} from './utils.js';

interface Day {
  count: number;
  day: number;
  month: number;
  year: number;
  weekdayIndex: number;
  weekIndex: number;
  localizedDay: (format?: 'numeric' | '2-digit') => string;
  name: (format?: 'long' | 'short' | 'narrow') => string;
  monthName: (format?: 'long' | 'short' | 'narrow') => string;
  isFirstStartWeekdayOfMonth: boolean;
}

export class Calendar {
  private startDate: Date;
  private endDate: Date;
  constructor(
    startDate: FullDate,
    endDate: FullDate,
    private startWeekDayIndex = DEFAULT_START_WEEKDAY_INDEX,
    private locale = DEFAULT_LOCALE
  ) {
    this.startDate = convertToJSDate(startDate);
    this.endDate = convertToJSDate(endDate);

    if (this.startDate.getTime() > this.endDate.getTime()) {
      throw new Error('startDate should be less than or equal to endDate');
    }
  }

  get length() {
    return getCoverage(this.startDate, this.endDate);
  }

  getWeekdayNames(format: 'long' | 'short' | 'narrow' = 'long') {
    const dayNames: string[] = [];

    [1, 2, 3, 4, 5, 6, 7].forEach((date) => {
      dayNames.push(
        formatDateComponent(
          new Date(Date.UTC(2023, 0, date)),
          this.locale,
          'weekday',
          format
        )
      );
    });

    return [
      ...dayNames.slice(this.startWeekDayIndex),
      ...dayNames.slice(0, this.startWeekDayIndex)
    ];
  }

  *[Symbol.iterator](): Generator<Day> {
    const endDateTimeStamp = this.endDate.getTime();
    let curDate = this.startDate;
    let count = 1;
    while (curDate.getTime() <= endDateTimeStamp) {
      yield {
        count,
        day: curDate.getUTCDate(),
        month: curDate.getUTCMonth() + 1,
        year: curDate.getUTCFullYear(),
        weekdayIndex: getRelativeWeekdayIndex(curDate, this.startWeekDayIndex),
        weekIndex: getMaxWeekIndex(
          this.startDate,
          curDate,
          this.startWeekDayIndex
        ),
        localizedDay: (format = 'numeric') => {
          return formatDateComponent(curDate, this.locale, 'day', format);
        },
        name: (format = 'long') => {
          return formatDateComponent(curDate, this.locale, 'weekday', format);
        },
        monthName: (format = 'long') => {
          return formatDateComponent(curDate, this.locale, 'month', format);
        },
        get isFirstStartWeekdayOfMonth() {
          return this.weekdayIndex == 0 && this.day >= 1 && this.day <= 7;
        }
      };
      curDate = new Date(curDate.getTime() + ONE_DAY_IN_MILLISECONDS);
      count++;
    }
  }

  static ofMonth(
    year: number,
    month: number,
    startWeekdayIndex = DEFAULT_START_WEEKDAY_INDEX,
    locale = DEFAULT_LOCALE
  ) {
    const startDate = [year, month, 1];
    const endDate = [
      year,
      month,
      new Date(Date.UTC(year, month, 0)).getUTCDate()
    ];
    return new Calendar(startDate, endDate, startWeekdayIndex, locale);
  }

  static ofYear(
    year: number,
    startWeekDayIndex = DEFAULT_START_WEEKDAY_INDEX,
    locale = DEFAULT_LOCALE
  ) {
    return new Calendar(
      [year, 1, 1],
      [year, 12, 31],
      startWeekDayIndex,
      locale
    );
  }

  static ofLastYear(
    startWeekdayIndex = DEFAULT_START_WEEKDAY_INDEX,
    locale = DEFAULT_LOCALE
  ) {
    const endDate = new Date();
    const startDate = new Date(
      endDate.getTime() - ONE_DAY_IN_MILLISECONDS * 364
    );
    return new Calendar(
      getLocaleDateArray(startDate),
      getLocaleDateArray(endDate),
      startWeekdayIndex,
      locale
    );
  }

  static custom(
    startDate: FullDate,
    endDate: FullDate,
    startWeekDayIndex = DEFAULT_START_WEEKDAY_INDEX,
    locale = DEFAULT_LOCALE
  ) {
    return new Calendar(startDate, endDate, startWeekDayIndex, locale);
  }
}
