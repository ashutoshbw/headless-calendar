import {Calendar} from "./Calendar.js";

export class CalendarOfYear extends Calendar {
  constructor(year, startWeekDayIndex = 0) {
    let startDateStr = `${year}-1-1`;
    let endDateStr = `${year}-12-31`;
    super(startDateStr, endDateStr, startWeekDayIndex);
  }
}

