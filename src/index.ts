import {
  FullDate,
  ONE_DAY_IN_MILLISECONDS,
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
  dayInFormat: (format?: 'numeric' | '2-digit') => string;
  dayName: (format?: 'long' | 'short' | 'narrow') => string;
  monthName: (format?: 'long' | 'short' | 'narrow') => string;
  isFirstStartWeekdayOfMonth: boolean;
}

interface Config {
  startWeekdayIndex?: number;
  locale?: string;
}

const DEFAULT_LOCALE = 'en-US';
const DEFAULT_START_WEEKDAY_INDEX = 0;

const defaultConfig: Config = {
  startWeekdayIndex: DEFAULT_START_WEEKDAY_INDEX,
  locale: DEFAULT_LOCALE
};

export class Calendar {
  private startDate: Date;
  private endDate: Date;
  private config;
  constructor(
    startDate: FullDate,
    endDate: FullDate,
    {
      startWeekdayIndex = DEFAULT_START_WEEKDAY_INDEX,
      locale = DEFAULT_LOCALE
    } = defaultConfig
  ) {
    this.startDate = convertToJSDate(startDate);
    this.endDate = convertToJSDate(endDate);
    this.config = {
      startWeekdayIndex,
      locale
    };

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
          this.config.locale,
          'weekday',
          format
        )
      );
    });

    return [
      ...dayNames.slice(this.config.startWeekdayIndex),
      ...dayNames.slice(0, this.config.startWeekdayIndex)
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
        weekdayIndex: getRelativeWeekdayIndex(
          curDate,
          this.config.startWeekdayIndex
        ),
        weekIndex: getMaxWeekIndex(
          this.startDate,
          curDate,
          this.config.startWeekdayIndex
        ),
        dayInFormat: (format = 'numeric') => {
          return formatDateComponent(
            curDate,
            this.config.locale,
            'day',
            format
          );
        },
        dayName: (format = 'long') => {
          return formatDateComponent(
            curDate,
            this.config.locale,
            'weekday',
            format
          );
        },
        monthName: (format = 'long') => {
          return formatDateComponent(
            curDate,
            this.config.locale,
            'month',
            format
          );
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
    {
      startWeekdayIndex = DEFAULT_START_WEEKDAY_INDEX,
      locale = DEFAULT_LOCALE
    } = defaultConfig
  ) {
    const startDate = [year, month, 1];
    const endDate = [
      year,
      month,
      new Date(Date.UTC(year, month, 0)).getUTCDate()
    ];
    return new Calendar(startDate, endDate, { startWeekdayIndex, locale });
  }

  static ofYear(
    year: number,
    {
      startWeekdayIndex = DEFAULT_START_WEEKDAY_INDEX,
      locale = DEFAULT_LOCALE
    } = defaultConfig
  ) {
    return new Calendar([year, 1, 1], [year, 12, 31], {
      startWeekdayIndex,
      locale
    });
  }

  static ofLastYear({
    startWeekdayIndex = DEFAULT_START_WEEKDAY_INDEX,
    locale = DEFAULT_LOCALE
  } = defaultConfig) {
    const endDate = new Date();
    const startDate = new Date(
      endDate.getTime() - ONE_DAY_IN_MILLISECONDS * 364
    );
    return new Calendar(
      getLocaleDateArray(startDate),
      getLocaleDateArray(endDate),
      { startWeekdayIndex, locale }
    );
  }

  static custom(
    startDate: FullDate,
    endDate: FullDate,
    {
      startWeekdayIndex = DEFAULT_START_WEEKDAY_INDEX,
      locale = DEFAULT_LOCALE
    } = defaultConfig
  ) {
    return new Calendar(startDate, endDate, { startWeekdayIndex, locale });
  }
}
