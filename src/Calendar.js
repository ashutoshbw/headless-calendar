import {Day} from "./Day.js";
import {PlainDate} from "./PlainDate.js";
import {getWeekDayNames, getDayAxisIndex, getMaxWeekAxisIndex, monthNames} from "./utils.js";

export class Calendar {
  constructor(startDateStr, endDateStr, startWeekDayIndex = 0) {
    this.startDate = new PlainDate(startDateStr);
    this.endDate = new PlainDate(endDateStr);
    this.startWeekDayIndex = startWeekDayIndex; 
  }

  get length() {
    return this.startDate.diff(this.endDate);
  }

  get weekDayNames() {
    return getWeekDayNames(this.startWeekDayIndex);
  }

  get maxWeekAxisIndex() {
    return getMaxWeekAxisIndex(this.startDate, this.endDate, this.startWeekDayIndex);
  }

/**
 * @param {Boolean} names - determines whether month and year names are written
 * @param {String}  s     - separator between dates
 */
  toString(names = true, s = " ") {
    let cal = new Calendar(this.startDate.toString(), this.endDate.toString(), this.startWeekDayIndex);
    let yMax = this.maxWeekAxisIndex;
    let result = "";

    let wDayNames = cal.weekDayNames.map(name => name.slice(0, 2));
    result += wDayNames.join(s) + "\n";

    for (let day of cal) {
      let [d, x, y, n] = [day.date, day.dayAxisIndex, day.weekAxisIndex, day.dayNumber];
      if (n == 1 && x > 0) {
        result += Array(x).fill("  ").join(s);
      }

      result += (x == 0 ? "" : s) + `${d.date}`.padStart(2);  

      if (names) {
        if (y == 0 && x == 6) result +=  ` ${monthNames[d.month - 1]} ${d.year}`;
        if (y > 0 && x == 6 && d.date <= 7) {
          result += ` ${monthNames[d.month - 1]}`;
          if (d.month == 0) result += ` ${d.year}`;
        }
      }

      result += (x == 6 && y != yMax ? "\n" : "");

      if (d.equals(this.endDate) && x < 6) {
        result += s + Array(7 - x - 1).fill("  ").join(s); 
      }
    }

    return result;
  }

  [Symbol.iterator]() {
    let startDate = this.startDate;
    let endDate = this.endDate;
    let swdi = this.startWeekDayIndex;
    return {
      curDate: startDate,
      curLength: 1,
      next() {
        if (this.curDate.equals(endDate.next())) return {done: true};
        let value = {value: new Day(
                      this.curDate,
                      this.curLength,
                      getDayAxisIndex(this.curDate, swdi),
                      getMaxWeekAxisIndex(startDate, this.curDate, swdi)
                    ), done: false};
        this.curDate = this.curDate.next();
        this.curLength++;
        return value;
      }
    };
  }
}
