import {Calendar} from "./Calendar.js";
import {monthNames} from "./utils.js";

export class CalendarOfMonth extends Calendar {
  constructor(year, month, startWeekDayIndex) {
    let startDateStr = `${year}-${month}-1`;
    let endDateStr = `${year}-${month}-${new Date(Date.UTC(year, month, 0)).getUTCDate()}`;
    super(startDateStr, endDateStr, startWeekDayIndex);
  }

  toString(s = " ") {
    let title = `${monthNames[this.startDate.month - 1]} ${this.startDate.year}`;
    let cal = super.toString(false, s);
    let calWidth = s.length * 6 + 14;
    let targetPadStartLen = Math.ceil((calWidth - title.length) / 2 + title.length);
    return title.padStart(targetPadStartLen).padEnd(calWidth) + "\n" + cal;
  }
}
