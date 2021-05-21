import {Calendar} from "./Calendar.js";
import {PlainDate} from "./PlainDate.js";

export class CalendarOfLastYear extends Calendar {
  constructor(startWeekDayIndex = 0) {
    const endDate = new PlainDate();
    const startDate = PlainDate.fromJSDate(new Date(endDate.toJSDate().getTime() - ((1000 * 60 * 60 * 24) * 364)));
    super(startDate.toString(), endDate.toString(), startWeekDayIndex);
  }
}
