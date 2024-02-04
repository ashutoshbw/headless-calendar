# headless-calendar

## 3.0.0

### Major Changes

- 2592bbb: `Calendar.custom()` or `new Calendar()` now takes date inputs as strings(of `year-month-day` format) instead of objects for easier usage.

### Patch Changes

- 2a5f533: (Github Actions) Updated actions/setup-node to v4

## 2.1.0

### Minor Changes

- 0dece07: Changes:

  - Fixed bug #4
  - Added `JSDate` property for days to easily get equivalent JavaScript `Date` objects
  - Updated README

## 2.0.0

### Major Changes

- 42861f4: - Read the [documention](https://github.com/ashutoshbw/headless-calendar/blob/main/README.md) to learn the new interface.
  - **New features**:
    - Added support for easily getting day numbers, names and month names in different languages using `Intl` API.
    - TypeScript support(the project is completely rewritten in TypeScript).
