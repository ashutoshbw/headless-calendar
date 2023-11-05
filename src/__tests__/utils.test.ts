import { it, expect, describe } from 'vitest';

import { FullDate, convertToJSDate, getLocaleDateArray } from '../utils';

describe('convertToJSDate()', () => {
  it('month number should start with 1', () => {
    const monthNumber = 1;
    const fullDate: FullDate = [2023, monthNumber, 1];
    const result = convertToJSDate(fullDate);
    expect(result.getUTCMonth()).toBe(monthNumber - 1); // in JS Date, month starts with 0
  });
});

describe('getLocaleDateArray()', () => {
  it('month number should start with 1', () => {
    const now = new Date();
    const result = getLocaleDateArray(now);
    expect(result[1]).toBe(now.getMonth() + 1);
  });
});
