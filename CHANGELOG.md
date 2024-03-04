# headless-calendar

## 3.1.5

### Patch Changes

- dd16f59: Another try to fix README's formatting on npm.

## 3.1.4

### Patch Changes

- 4400ba5: Another trial to fix README.md's formatting in npm.

## 3.1.3

### Patch Changes

- de78a7a: A trial to fix the README.md's anchor links in NPM appearing on a newline.

## 3.1.2

### Patch Changes

- f208272: Fixed internal link in doc.

## 3.1.1

### Patch Changes

- 6b612ce: Updated documentation for exported types `Day` and `Config`.

## 3.1.0

### Minor Changes

- e5cbfc0: Exported all locally used types that is `Day` and `Config` #8.

### Patch Changes

- e5cbfc0: Removed unused types: `FullDate`.
- e5cbfc0: Updated README.md.

## 3.0.0

### Major Changes

- 2592bbb: `Calendar.custom()` or `new Calendar()` now takes date inputs as strings(of `year-month-day` format) instead of objects for easier usage.

### Patch Changes

- 2a5f533: (Github Actions) Updated actions/setup-node to v4

## 2.1.0

### Minor Changes

- 0dece07:
  - Fixed bug #4
  - Added `JSDate` property for days to easily get equivalent JavaScript `Date` objects
  - Updated README

## 2.0.0

### Major Changes

- 42861f4:
  - Added support for easily getting day numbers, names and month names in different languages using `Intl` API.
  - TypeScript support(the project is completely rewritten in TypeScript).
