# Headless Calendar(v1.0.0)
A simple and easy to use JavaScript library that provides common calendar functionalities for making completely customizable calendar UI.

## 💡 Features
* It does all the calculations for finding the position of a day in a calendar.
* A calendar is an iterable. So you can use `for of` loop or the spread syntax to easily iterate over the days.
* You can choose which day to start a week with.
* Provides handy calendar classes for generating calendar of any month, year, last year or any period of time supported by original JavaScript Date object.
* It is based on original JavaScript `Date` but provides an abstraction over by excluding all the parts that doesn't needed or are not intuitive.

## Installation
```
npm i headless-calendar
```

## Meet the tools  
Classes | Description
--- | ---
`Calendar` | It is the generic class for generating any arbitrary calendar from any date to any future date.
`CalendarOfMonth` | It generates calendar of any given month.
`CalendarOfYear` | It generates calendar of any given year.
`CalendarOfLastYear` | It generates the calendar of the last year that is the calendar of last 365 days including today.
`PlainDate` | It is a simple wrapper around the JavaScript `Date`. You can use it to find the difference between two dates, next, previous days and some other helpful things.

You can fetch the above classes using both ES6 and CommonJS module syntax. 

## 🦉 Concepts
To understand how to use `headless-calendar` effectively, it will be helpful to picture a calendar as a two dimensional diagram like below:
```
    +-------------------------> Day Axis
    |  0  1  2  3  4  5  6 ---> Day Axis indices. Starts with 0.
    |  V  V  V  V  V  V  V
    | Su Mo Tu We Th Fr Sa ---> Day Names
    |           1  2  3  4 ---> 0
    |  5  6  7  8  9 10 11 ---> 1
    | 12 13 14 15 16 17 18 ---> 2
    | 19 20 21 22 23 24 25 ---> 3
    | 26 27 28 29 30 31    ---> 4
    |                           |
    V                           V
Week Axis                Week Axis indices. Starts with 0 too.
```

## Examples
```javascript
import {CalendarOfMonth} from "headless-calendar";

// generates the calendar of January of 2021
const month = new CalendarOfMonth(2021, 1); 

for (day of month) {
  console.log(day);
}

/*
Day {
  date: PlainDate { year: 2021, month: 1, date: 1 },
  dayNumber: 1,       // it counts the day
  dayAxisIndex: 5,    // the day axis index as explained in the above diagram
  weekAxisIndex: 0    // the week axis index as explained in the above diagram
}
            .
            .
            .
*/
```

The day object holds the necessary information about it's position on the calendar. This pattern of accessing days are same for all the calendar classes.

And as any calendar is an iterable you can also use it like below:
```javascript
// console logs only dates that are Sundays
[...month].forEach(day => {
  if (day.dayAxisIndex == 0) {
    console.log(day.date.date);
  }
})
```

## `Calendar`
This class is used to generate a calendar starting with any date to any future date. All the other calendar classes are derived from it.

Syntax:
```
new Calendar(startDateString, endDateString, [startWeekDayIndex])
```
### Parameters
* `startDateString`(String) and `endDateString`(String): They should follow the format `year-month-date` format. Each part is expressed with digits. `endDateString` must represent a equal or later date than `startDateString`.
* `startWeekDayIndex`(Number) *Optional*: It represents the day to start the week with. `0` means Sunday and it goes on incrementally until 6 means Saturday. 

### Return value
An iterable object. It has the following properties:
* `startDate`: It is the `PlainDate` version of starting date.
* `endDate`: It is the `PlainDate` version of ending date.
* `startWeekDayIndex`: It keeps record of the `startWeekDayIndex` parameters value. It that is not provided it defaults to zero.
* `maxWeekAxisIndex`: This returns last week's *week axis index*.
* `weekDayNames`: It returns an array of day names with the starting day as you specified with the `startWeekDayIndex` parameter.
* `length`: It returns the number total days in the calendar.

And it has a `toString()` method for easily seeing the output of a calendar. For example:

```javascript
import {Calendar} from "headless-calendar";

const cal = new Calendar("2021-1-1", "2021-2-10");
console.log(cal.toString());
/*
Su Mo Tu We Th Fr Sa
                1  2 January 2021
 3  4  5  6  7  8  9
10 11 12 13 14 15 16
17 18 19 20 21 22 23
24 25 26 27 28 29 30
31  1  2  3  4  5  6 February
 7  8  9 10         
*/
```

The iterable is used to iterate over the days of the calendar. Each item of the sequence of this iterable is an object that represents a day. These day objects comes with the following properties and methods:

#### Properties
* `date`: A `PlainDate` representing that day.
* `dayNumber`: If it is *n*, it means it's the *n*th day of the calendar.
* `dayAxisIndex`: It is the *day axis index* of the day as shown in diagram.
* `weekAxisIndex`: It is the *week axis index* of the day as shown in diagram.

#### Methods
* `isFirstDayOfWeekAndMonth()`: It returns a Boolean value indicating if the day is the 1st day of the week and also the 1st day of the month. This value is useful if you want to show month names right above such days.

## `CalendarOfMonth`
This class is used to generate a calendar of the specified month.

Syntax:
```
new CalendarOfMonth(year, month, [startWeekDayIndex])
```

### Parameters
* `year`(Number) and `month`(Number): The year and month number for generating the calendar. 
* `startWeekDayIndex`(Number) *Optional*: It represents the day to start the week with. `0` means Sunday and it goes on incrementally until 6 means Saturday. 

### Return value
An iterable object with the same interface of a `Calendar` instance representing the days of the specified month.

It's `toString()` method formats the calendar a little differently than the original `Calendar` class:
```javascript
import {CalendarOfMonth} from "headless-calendar";

const month = new CalendarOfMonth(2021, 0);
console.log(month.toString())

/*
    January 2021    
Su Mo Tu We Th Fr Sa
                1  2
 3  4  5  6  7  8  9
10 11 12 13 14 15 16
17 18 19 20 21 22 23
24 25 26 27 28 29 30
31                  
*/
```

## `CalendarOfYear`
This class is used to generate a calendar of the given year.

Syntax:
```
new CalendarOfYear(year, [startWeekDayIndex])
```

### Parameters
* `year`(Number): The year number for generating the calendar. 
* `startWeekDayIndex`(Number) *Optional*: It represents the day to start the week with. `0` means Sunday and it goes on incrementally until 6 means Saturday. 

### Return value
An iterable object with the same interface of a `Calendar` instance, representing the days of the specified year.

## `CalendarOfLastYear`
It generates the calendar of last year, that is the calendar of last 365 days including today(according to local time).

Syntax:
```
new CalendarOfLastYear([startWeekDayIndex])
```

### Parameters
* `startWeekDayIndex`(Number) *Optional*: It represents the day to start the week with. `0` means Sunday and it goes on incrementally until 6 means Saturday. 

### Return value
An iterable object with the same interface of a `Calendar` instance, representing the days of last year(last 365 days including today).

## `PlainDate`
`PlainDate` is wrapper class around the original JavaScript `Date`. It only thinks about year, month and date. No hours, minutes or others parts. 

Syntax:
```
new PlainDate(dateString)
```
### Parameters
* `dateString`(String) *Optional*: It should follow the format `year-month-date` format. Each part is expressed with digits. If it is omitted, it is treated as current date according to local time.

### Return value
An instance of `PlainDate`. It it only has three properties `year`, `month` and `date` holding the corresponding given information.

A `PlainDate` instance has the following methods:
#### `toJSDate` 
It converts a `PlainDate` to JavaScript date.

Syntax:
```javascript
somePlainDate.toJSDate()
```
##### Parameters
No parameter
##### Return value
JavaScript version of the `PlainDate`.

#### `equals` 
Checks whether two `PlainDate`s are equal or not.

Syntax:
```javascript
somePlainDate.equals(another)
```
##### Parameters
* `another`(PlainDate): Another `PlainDate` value to compare to.
##### Return value
A Boolean value indicating whether the `PlainDate` equals `another` `PlainDate`.

#### `diff`
Returns the difference between two `PlainDate`s.

Syntax:
```
somePlainDate.diff(another);
```

##### Parameters
* `another`(PlainDate): Another `PlainDate` value to find the difference.
##### Return value
The difference between the two `PlainDate`s. Note that the boundary dates are included in the counting.

#### `next`
Returns the next `PlainDate`. 

Syntax:
```
somePlainDate.next();
```

##### Parameters
None. 

##### Return value
The next `PlainDate`.

#### `previous`
Returns the previous `PlainDate`. 

Syntax:
```
somePlainDate.previous();
```

##### Parameters
None. 

##### Return value
The previous `PlainDate`.

#### `toString`
A string representation of the `PlainDate`. 

Syntax:
```
somePlainDate.toString();
```

##### Parameters
None. 

##### Return value
A string representation of `somePlainDate` with the `year-month-date` format where each part is made of digits. `year` is full year. 

### Static methods of `PlainDate`
#### `fromJSDate`
Returns a plain date from a JavaScript date.

Syntax:
```javascript
PlainDate.fromJSDate(date, [UTC])
```

##### Parameters
* `date`(Date): A JavaScript `Date` instance.
* `UTC`(Boolean) *Optional*: By default it is `true`, that means the date is treated as UTC time. If you want local time, set it to `false`.

##### Return value
The `PlainDate` version of the JavaScript date according to UTC or local time(based on the 2nd parameter).

#### `today`
Returns today in `PlainDate`.

Syntax:
```javascript
PlainDate.today([UTC])
```

##### Parameters
* `UTC`(Boolean) *Optional*: By default it is `false`, that means we will get result in local time. If you want UTC time set it to `true`.

##### Return value
Today in `PlainDate` according local time or UTC time(based on the 1st parameter).

## License
MIT
