# 🗓️ Headless Calendar

A small library (just **1kb** when minified and gzipped) written in TypeScript that handles the tedious calendar logic for you, freeing you to concentrate on crafting the perfect UI. You can use it in JavaScript projects too.

If you find this library useful, please star [this repository on GitHub](https://github.com/ashutoshbw/headless-calendar).

## Table of contents

- [Motivation](#motivation)
- [Installation](#installation)
  - [Installation in node project](#installation-in-node-project)
  - [Can I use it in the browser without any bundlers?](#can-i-use-it-in-the-browser-without-any-bundlers)
- [Usage](#usage)
  - [How to create a calendar and iterate over its days?](#how-to-create-a-calendar-and-iterate-over-its-days)
  - [Handy static methods to get a calendar of a specific period of time](#handy-static-methods-to-get-a-calendar-of-a-specific-period-of-time)
  - [Properties of `Calendar` instances](#properties-of-calendar-instances)
  - [How to customize the start weekday?](#how-to-customize-the-start-weekday)
  - [How to get day or month names in other languages?](#how-to-get-day-or-month-names-in-other-languages)
  - [How to get the day numbers in some particular language?](#how-to-get-the-day-numbers-in-some-particular-language)
  - [What is the default locale used in `headless-calendar`?](#what-is-the-default-locale-used-in-headless-calendar)
  - [How to get day or month names in shortened form?](#how-to-get-day-or-month-names-in-shortened-form)
  - [What is the use of `isFirstStartWeekdayOfMonth` property of a day?](#what-is-the-use-of-isfirststartweekdayofmonth-property-of-a-day)
- [❤️ Interested in contributing?](#%EF%B8%8F-interested-in-contributing)
- [License](#license)

## Motivation

I love the GitHub contribution graph and wanted to create similar UIs in a customizable way. This desire led to the creation of this library, which includes a dedicated function `Calendar.ofLastYear()` to handle such tasks. However, I didn't want it to be limited to just GitHub contribution graph-like features. So I added some common functionality such as iterating over a specific month, a basic requirement for creating a date picker. Since it lacks a UI, any UI can be plugged in, making the possibilities endless.

If you use it in your project, feel free to [share it with me](https://twitter.com/ashutoshbw). I would love to see what you build using it.

## Installation

### Installation in node project

To use it in node project, you can install it with your node package manager. For npm the command is:

```bash
npm i headless-calendar
```

for pnpm:

```bash
pnpm add headless-calendar
```

or for yarn:

```bash
yarn add headless-calendar
```

### Can I use it in the browser without any bundlers?

Of course. Add the following script element in the `<head>` of your HTML:

```html
<script type="importmap">
  {
    "imports": {
      "headless-calendar": "https://esm.sh/headless-calendar"
    }
  }
</script>
```

Now you can use it your script in the same way as with a bundler or node in ESM way:

```html
<script type="module">
  import { Calendar } from 'headless-calendar';
</script>
```

Note that if you are running it in your local machine, you will need to run it through a local web server.

If you are new to importmap see [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap).

## Usage

### How to create a calendar and iterate over its days?

`headless-calendar` provides a single entity, namely a class called `Calendar`. To use it you don't need to instanciate it directly since it offers some handy static methods to work with. Let's explore them.

```js
// You can get Calendar In ESM sytle
import { Calendar } from 'headless-calendar';

// CommonJS style is supported too
// const { Calendar } = require('headless-calendar');

// Let's create a calendar of Ferbuary of 2024
const february = Calendar.ofMonth(2024, 2);

// `february` is an iterable. You can easily get useful info for each day like below:
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
  console.log('JavaScript Date object representing the day:', day.JSDate);
}
```

Below is the output of first 2 iteration of the loop:

```
-------- 1 February 2024 --------
Number of day: 1
Day number of current month: 1
Day number of current month in format: 1
Current Month number: 2
Current year: 2024
Where the day is in a week: 4
Where the day is in terms of passed weeks: 0
Day name: Thursday
Current month name: February
Is it the first start weekday of current month? false
JavaScript Date object representing the day: 2024-02-01T00:00:00.000Z
-------- 2 February 2024 --------
Number of day: 2
Day number of current month: 2
Day number of current month in format: 2
Current Month number: 2
Current year: 2024
Where the day is in a week: 5
Where the day is in terms of passed weeks: 0
Day name: Friday
Current month name: February
Is it the first start weekday of current month? false
JavaScript Date object representing the day: 2024-02-02T00:00:00.000Z
```

Since the `Calendar` instances are iterable you can use spread syntax too. For example:

```js
[...Calendar.ofMonth(2024, 2)].forEach((day) => {
  // do something
});
```

**Note:** `headless-canledar` doesn't provide any functionality for iterating by time periods other than days (e.g., months or years).

If you are using TypeScript and need the type of day objects, import the type `Day` using your preferred method for importing types. Below is an example that imports both the `Calendar` class and the type `Day` using [inline type imports](https://www.typescriptlang.org/docs/handbook/2/modules.html#inline-type-imports):

```typescript
import { Calendar, type Day } from 'headless-canledar';
```

### Handy static methods to get a calendar of a specific period of time

You can also get the days of a specific time period other than a month, like year or last year like below and get same kind of information(as shown above for `ofMonth` static method) like below:

```js
const someDays = Calendar.custom(`2024-01-15`, `2024-02-01`);

// For Calendar.custom the input format is "year-month-day".
// Leading zeros are optional. So the line below does the same thing as the above one:
// const someDays = Calendar.custom(`2024-1-15`, `2024-2-1`);

const year2042 = Calendar.ofYear(2042);
const lastYear = Calendar.ofLastYear(); // from 364 days ago to today
```

Note that `Calendar.custom(...)` is an alias of `new Calendar(...)`. So `someDays` can also be written like below:

```js
const someDays = new Calendar(`2024-01-15`, `2024-02-01`);
```

### Properties of `Calendar` instances

All `Calendar.<staticMethod>`s (namely `custom`, `ofMonth`, `ofYear` and `ofLastYear`) return a new instance of `Calendar`.

From a `Calendar` instance you can easily get the number of days in it using its `length` property. You can also get the weekday names using its `getWeekdayNames` method. For example:

```js
const lastYear = Calendar.ofLastYear(); // from 364 days ago to today
console.log(lastYear.length);
// 365

console.log(lastYear.getWeekdayNames());
// [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]
```

If you customize the calendar to start on Monday(see [below](#how-to-customize-the-start-weekday) to learn how to do it). Then `lastYear.getWeekdayNames()` will produce:

```js
['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
```

**Note**: Here the term weekday has a liitle bit different meaning than ordinary langauge. Here all 7 days of week are considered weekdays. There is a start weekday and an end weekday. The default start weekday is Sunday.

### How to customize the start weekday?

On any `Calendar.<staticMethod>`s you can set your preferred start weekday like below:

```js
Calendar.ofMonth(2024, 2, { startWeekdayIndex: 1 });
```

It will use Monday as the start weekday. Below is the what the different values `startWeekdayIndex` means:

| `startWeekdayIndex` | What it means |
| ------------------- | ------------- |
| 0                   | Sunday        |
| 1                   | Monday        |
| 2                   | Tuesday       |
| 3                   | Wednesday     |
| 4                   | Thursday      |
| 5                   | Friday        |
| 6                   | Saturday      |

The object that you pass is called the _config_ object. Using it you can also set a different language for day names and month names. We will see that next.

**Note**: The type of this _config_ object is available as the type `Config`. If you need it, you can import it similar to the type `Day`.

### How to get day or month names in other languages?

You have to set the locale as a string. For example if you want to get the day and month names in Bengali, you can do it like below:

```js
Calendar.ofMonth(2024, 2, { locale: 'bn' });

for (const day of cal) {
  console.log(day.dayName(), day.monthName());
}
```

Localization support is made using JavaScript `Intl` API. For more info on locale see [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument).

The object that you pass is called the _config_ object. Using it you can also customize the start weekday. See the [above section](#how-to-customize-the-start-weekday).

**Note**: The type of this _config_ object is available as the type `Config`. If you need it, you can import it similar to the type `Day`.

### How to get the day numbers in some particular language?

You have to set the numbering system unicode extension in the locale. For example if you want to get the day and month names in English, but day numbers in Arabic, you have to use the `arab` numbering system identifer like below:

```js
const cal = Calendar.ofMonth(2024, 2, { locale: 'en-u-nu-arab' });

for (const day of cal) {
  console.log(day.dayInFormat());
}
```

For the list of available numbering systems see [Supported numbering system types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getNumberingSystems#supported_numbering_system_types).

In the `dayInFormat()` method you can pass `'numeric'` or '`2-digit`' to customize the output.

Localization support is made using JavaScript `Intl` API. For more info on locale see [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument).

Note that for some languages(e.g. in `bn`) the numbering system fallbacks to the language subtag you specify. In this case if you want a differnt a numbering system you have to explicity specify it(e.g. `bn-u-nu-latn`).

### What is the default locale used in `headless-calendar`?

The default `locale` used here is `en-u-nu-latn`. It uses the Gregorian calendar and it is set in stone in `headless-calendar` so you can't alter it by passing a different calendar as unicode extension(e.g. `en-u-nu-latn-ca-indian`).

If the hypen seperated strings are new to you see [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument) to know more about them.

### How to get day or month names in shortened form?

Example:

```js
const february = Calendar.ofMonth(2024, 2);

february.getWeekdayNames('narrow');

for (const day of february) {
  console.log(day.dayName('short'));
  console.log(day.monthName('short'));
}
```

Name shortening is also powered by JavaScript `Intl` API. You can use the same interface. For example:

- For day names you can use `'narrow'`, `'short'` or `'long'` strings to control the name length. See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#weekday) for more info.
- For month names you can use `'narrow'`, `'short'`, `'long'`, `'numeric'` or `'2-digit'` strings to control the name length. See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#month) for more info.

### What is the use of `isFirstStartWeekdayOfMonth` property of a day?

It can be useful if you want to create Github contribution calendar like thing and want to place the month names on top of days where it is the first start weekday of a month.

## ❤️ Interested in contributing?

See [CONTRIBUTING](https://github.com/ashutoshbw/headless-calendar/blob/main/CONTRIBUTING.md) for guidelines.

## License

[MIT](https://github.com/ashutoshbw/headless-calendar/blob/main/LICENSE)
