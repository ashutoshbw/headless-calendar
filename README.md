# 🗓️ Headless Calendar

A tiny modern tool to help you make calendar UI easily. It's goal is keep itself away as much as possible so that you can focus on the UI more.

## Getting Started

### Installation

#### npm

```bash
npm i headless-calendar
```

#### Yarn

```bash
yarn add headless-calendar
```

#### pnpm

```bash
pnpm add headless-calendar
```

#### HTML(the modern way)

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

If you are new to importmap see [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap).

Note that if you are running it in your local machine, you will need to run it through a local web server. (For an example, if you have python installed, you can easily start a local web server at port `3000` in your current directory by entering `python -m http.server 3000` from your terminal.)

### Basic usage

`headless-calendar` gives us a single thing named `Calendar`. Let's see how to use it.

```js
import { Calendar } from 'headless-calendar';

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

**Note**: Beside ESM, this tool also supports CommonJS style. So you can use `require('headless-calendar')` instead of importing, if you are using CommonJS style.

Since the `Calendar` instances are iterable you can use spread syntax too. For example:

```js
[...Calendar.ofMonth(2024, 2)].forEach((day) => {
  // do something
});
```

You can also get the days of a particular time period, year or even last year like below and get same set of informations as shown above:

```js
const someDays = Calendar.custom(
  { year: 2024, month: 1, day: 15 },
  { year: 2024, month: 2, day: 1 }
);
const year2042 = Calendar.ofYear(2042);
const lastYear = Calendar.ofLastYear(); // from 364 days ago to today
```

If you want you can use `new Calendar()` instead of `Calendar.custom()`. For example `someDays` can also be written like below:

```js
const someDays = new Calendar(
  { year: 2024, month: 1, day: 15 },
  { year: 2024, month: 2, day: 1 }
);
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

## Some questions that you might have

`headless-calendar` is a very small tool. Not much to know about it. Let's cover the rest of details using question answer style.

### What is a weekday exactly?

Here the term weekday has a liitle bit different meaning than ordinary langauge. Here all 7 days make the set of weekdays. There is a start weekday and an end weekday. The default start weekday is Sunday.

### How to customize the start weekday?

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

### How to get day or month names in other languages?

You have to set the locale as a string. For example if you want to get the day and month names in Bengali, you can do it like below:

```js
Calendar.ofMonth(2024, 2, { locale: 'bn' });

for (const day of cal) {
  console.log(day.dayName(), day.monthName());
}
```

Localization support is made using JavaScript `Intl` API. For more info on locale see [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument).

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

## ❤️ Interested in Contributing?

See [CONTRIBUTING](https://github.com/ashutoshbw/headless-calendar/blob/main/CONTRIBUTING.md) for guidelines.

## License

[MIT](https://github.com/ashutoshbw/headless-calendar/blob/main/LICENSE)
