# Headless Calendar(v2.0.0)

It's just a tiny tool to help you make your dream Calendar UI.

## Install

```bash
npm i headless-calendar
```

## Basic usage

```js
import { Calendar } from 'headless-calendar';

// 🍁 Basic Usage
const february = Calendar.ofMonth(2024, 2);

// Now you can easily get useful info for each day like below:
for (const day of february) {
  console.log(`-------- ${day.day} ${day.monthName()} ${day.year} --------`);
  console.log('Number of day:', day.count);
  console.log('Day number of current month:', day.day);
  console.log('Day number of current month in format:', day.dayInFormat());
  console.log('Current Month number:', day.month);
  console.log('Current year:', day.year);
  console.log('Where the day is in a week:', day.weekdayIndex);
  console.log('Where the day is in terms of passed weeks:', day.weekIndex);
  console.log('Day name:', day.dayName());
  console.log('Current month name:', day.monthName());
  console.log(
    'Is it the first start weekday of current month?',
    day.isFirstStartWeekdayOfMonth
  );
}
```

You can also get the days of a particular time period, year or even
last year like below and get same set of informations as shown above:

```js
const someDays = Calendar.custom([2024, 1, 15], [2024, 2, 1]);
const year2042 = Calendar.ofYear(2042);
const lastYear = Calendar.ofLastYear(); // from 364 days ago to today
```

All `Calendar.<method>`s (namely `custom`, `ofMonth`, `ofYear` and `ofLastYear`) return a new instance of `Calendar`.

If you want you can use `new Calendar()` instead of `Calendar.custom()`. For example the `someDays` can also be written like below:

```js
const someDays = new Calendar([2024, 1, 15], [2024, 2, 1]);
```

From a `Calendar` instance you can easily get the number of days in it using it's `length` property. You can also get the names of days in week of that calendar using its `getWeekdayNames`. For example:

```js
console.log(lastYear.length);
// 365

console.log(lastYear.getWeekdayNames());
// [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]
```

If we customize the calendar to start on Monday then `lastYear.getWeekdayNames()` will produce:

```js
['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
```

Next we will see how you can customize the calendar in question answer style.
