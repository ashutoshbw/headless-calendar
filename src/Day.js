export class Day {
  constructor(date, dayNumber, dayAxisIndex, weekAxisIndex) {
    this.date = date;
    this.dayNumber = dayNumber;
    this.dayAxisIndex = dayAxisIndex;
    this.weekAxisIndex = weekAxisIndex;
  }

  isFirstDayOfWeekAndMonth() {
    const date = this.date.getUTCDate();
    return this.dayAxisIndex == 0 && date >= 1 && date <= 7;
  }
}
