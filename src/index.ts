import {
  ONE_DAY_IN_MILLISECONDS,
  DEFAULT_LOCALE,
  DEFAULT_START_WEEKDAY_INDEX,
  convertToJSDate,
  getCoverage,
  getRelativeWeekdayIndex,
  getMaxWeekIndex,
  getDayNameOf,
  getMonthNameOf,
} from "./utils.js";

interface Day {
  count: number;
  date: number;
  month: number;
  year: number;
  weekdayIndex: number;
  weekIndex: number;
  name: (format?: "long" | "short" | "narrow") => string;
  monthName: (format?: "long" | "short" | "narrow") => string;
  isFirstDayOfWeekAndMonth: boolean;
}

export class Calendar {
  private startDate: Date;
  private endDate: Date;
  constructor(
    startDate: string,
    endDate: string,
    private startWeekDayIndex = DEFAULT_START_WEEKDAY_INDEX,
    private locale = DEFAULT_LOCALE
  ) {
    this.startDate = convertToJSDate(startDate);
    this.endDate = convertToJSDate(endDate);
  }

  get length() {
    return getCoverage(this.startDate, this.endDate);
  }

  getWeekdayNames(format: "long" | "short" | "narrow" = "long") {
    const dayNames: string[] = [];

    [1, 2, 3, 4, 5, 6, 7].forEach((date) => {
      dayNames.push(
        getDayNameOf(new Date(Date.UTC(2023, 0, date)), {
          locale: this.locale,
          format,
        })
      );
    });

    return [
      ...dayNames.slice(this.startWeekDayIndex),
      ...dayNames.slice(0, this.startWeekDayIndex),
    ];
  }

  *[Symbol.iterator](): Generator<Day> {
    const endDateTimeStamp = this.endDate.getTime();
    let curDate = this.startDate;
    let count = 1;
    while (curDate.getTime() <= endDateTimeStamp) {
      yield {
        count,
        date: curDate.getUTCDate(),
        month: curDate.getUTCMonth() + 1,
        year: curDate.getUTCFullYear(),
        weekdayIndex: getRelativeWeekdayIndex(curDate, this.startWeekDayIndex),
        weekIndex: getMaxWeekIndex(
          this.startDate,
          curDate,
          this.startWeekDayIndex
        ),
        name: (format = "long") => {
          return getDayNameOf(curDate, {
            locale: this.locale,
            format,
          });
        },
        monthName: (format = "long") => {
          return getMonthNameOf(curDate, {
            locale: this.locale,
            format,
          });
        },
        get isFirstDayOfWeekAndMonth() {
          return this.weekdayIndex == 0 && this.date >= 1 && this.date <= 7;
        },
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
    let startDateStr = `${year}-${month}-1`;
    let endDateStr = `${year}-${month}-${new Date(
      Date.UTC(year, month, 0)
    ).getUTCDate()}`;
    return new Calendar(startDateStr, endDateStr, startWeekdayIndex, locale);
  }
}
