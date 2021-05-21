export class PlainDate {
  constructor(dateStr = PlainDate.today().toString()) {
    const [year, month, date] = dateStr.split("-").map(s => +s);
    this.year = year;
    this.month = month;
    this.date = date;
  }

  toJSDate() {
    return new Date(Date.UTC(this.year, this.month - 1, this.date));
  }

  equals(another) {
    if (this.year == another.year && 
        this.month == another.month &&
        this.date == another.date) return true;
    return false;
  }

  diff(another) {
    return (Math.abs(another.toJSDate().getTime() - 
            this.toJSDate().getTime()) / 86400000) + 1; 
  }

  next() {
    return PlainDate.fromJSDate(new Date(this.toJSDate().getTime() + 1000 * 60 * 60 * 24));
  }

  previous() {
    return PlainDate.fromJSDate(new Date(this.toJSDate().getTime() - 1000 * 60 * 60 * 24));
  }

  toString() {
    return `${this.year}-${this.month}-${this.date}`;
  }

  static fromJSDate(date, UTC = true) {
    return new PlainDate(UTC ? `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}` :
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)  
  }

  static today(UTC = false) {
    const date = new Date();
    return new PlainDate(UTC ? `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}` :
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)  
  }
}
