import { it, expect, describe } from 'vitest';

import {
  FullDate,
  convertToJSDate,
  getLocaleDateArray,
  getCoverage
} from '../utils';

describe('convertToJSDate()', () => {
  it('month should start with 1', () => {
    const monthNumber = 1;
    const fullDate: FullDate = [2023, monthNumber, 1];
    const result = convertToJSDate(fullDate);
    expect(result.getUTCMonth()).toBe(monthNumber - 1); // in JS Date, month starts with 0
  });
});

describe('getLocaleDateArray()', () => {
  it('month should start with 1', () => {
    const now = new Date();
    const result = getLocaleDateArray(now);
    expect(result[1]).toBe(now.getMonth() + 1); // in JS Date, month starts with 0
  });

  it('returned array should have length 3', () => {
    const now = new Date();
    const result = getLocaleDateArray(now);
    expect(result.length).toBe(3);
  });
});

describe('getCoverage()', () => {
  it('should include boundary dates', () => {
    const date = new Date(Date.UTC(2023, 10, 6));
    expect(getCoverage(date, date)).toBe(1);
  });
});
