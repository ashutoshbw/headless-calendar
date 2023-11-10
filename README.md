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

If you want you can use `new Calendar()` instead of `Calendar.custom()`. For example `someDays` can also be written like below:

```js
const someDays = new Calendar([2024, 1, 15], [2024, 2, 1]);
```

All `Calendar.<staticMethod>`s (namely `custom`, `ofMonth`, `ofYear` and `ofLastYear`) return a new instance of `Calendar`.

From a `Calendar` instance you can easily get the number of days in it using it's `length` property. You can also get the names of days in week of that calendar using its `getWeekdayNames`. For example:

```js
console.log(lastYear.length);
// 365

console.log(lastYear.getWeekdayNames());
// [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]
```

If you customize the calendar to start on Monday(see Customization section for how to) then `lastYear.getWeekdayNames()` will produce:

```js
['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
```

Next we will see how you can customize the calendar and some helpful info in question answer style.

## Customization

<details>
  <summary>
    <h3>How to customize the start weekday?</h3>
  </summary>

On any `Calendar.<staticMethod>`s you can set your preferred week start day like below:

```js
Calendar.ofMonth(2024, 2, { startWeekdayIndex: 1 });
```

It will use Monday as the week start day. Below is the what the different values `startWeekdayIndex` means:

| `startWeekdayIndex` | What it means |
| ------------------- | ------------- |
| 0                   | Sunday        |
| 1                   | Monday        |
| 2                   | Tuesday       |
| 3                   | Wednesday     |
| 4                   | Thursday      |
| 5                   | Friday        |
| 6                   | Saturday      |

The object that you pass is called the _config_ object. Using it you can also set a different language for day, month names, which we will see next.

</details>

<details>
  <summary>
    <h3>How to get day or month names in other languages?</h3>
  </summary>

You have to set the locale. For example if you want get the day and month names in Bangla, you can do it like below:

```js
Calendar.ofMonth(2024, 2, { locale: 'bn' });
```

</details>

<details>
  <summary>
    <h3>What is the default locale used in `headless-calendar`?</h3>
  </summary>

The default `locale` used here is almost `en-u-nu-latn`. It's a bit more explicit. It uses the Gregorian Calendar and it is set in stone in `headless-calendar` so you can't alter it by passing a different calendar as unicode extension(e.g. `-u-ca-japanese`).

Localization support is made using JavaScript `Intl` API.

</details>

<details>
  <summary>
    <h3>How to get day or month names in shortened form?</h3>
  </summary>

Example:

```js
const february = Calendar.ofMonth(2024, 2);

february.getWeekdayNames('narrow');

for (const day of february) {
  console.log(day.dayName('short'));
  console.log(day.monthName('short'));
}
```

Name shortening is done using JavaScript `Intl` API. And you can use the same interface. For example:

- For day names you can use `'narrow'`, `'short'` and `'long'` strings to control the name length. See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#weekday) for detail.
- For month names you can use `'narrow'`, `'short'`, `'long'`, `'numeric'` and `'2-digit'` strings to control the name length. See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#month) for detail.

</details>

<details>
  <summary>
    <h3>Heading</h3>
  </summary>

bla bla

</details>
