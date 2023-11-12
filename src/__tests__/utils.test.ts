import { it, expect, describe } from 'vitest';

import {
  FullDate,
  convertToJSDate,
  getLocaleFullDate,
  getCoverage,
  getRelativeWeekdayIndex
} from '../utils';

describe('convertToJSDate()', () => {
  it('month should start with 1', () => {
    const monthNumber = 1;
    const fullDate: FullDate = { year: 2023, month: monthNumber, day: 1 };
    const result = convertToJSDate(fullDate);
    expect(result.getUTCMonth()).toBe(monthNumber - 1); // in JS Date, month starts with 0
  });
});

describe('getLocaleFullDate()', () => {
  it('month should start with 1', () => {
    const now = new Date();
    const result = getLocaleFullDate(now);
    expect(result.month).toBe(now.getMonth() + 1); // in JS Date, month starts with 0
  });
});

describe('getCoverage()', () => {
  it('should include boundary dates', () => {
    const date = new Date(Date.UTC(2023, 10, 6));
    expect(getCoverage(date, date)).toBe(1);
  });
});

describe('getRelativeWeekdayIndex()', () => {
  describe('For Sunday, January 1st 2023', () => {
    const date = new Date(Date.UTC(2023, 0, 1));

    it('if startWeekdayIndex = 0 (Sun), it should produce 0', () => {
      const startWeekdayIndex = 0;
      const result = getRelativeWeekdayIndex(date, startWeekdayIndex);
      expect(result).toBe(0);
    });

    it('if startWeekdayIndex = 1 (Mon), it should produce 6', () => {
      const startWeekdayIndex = 1;
      const result = getRelativeWeekdayIndex(date, startWeekdayIndex);
      expect(result).toBe(6);
    });

    it('if startWeekdayIndex = 2 (Tue), it should produce 5', () => {
      const startWeekdayIndex = 2;
      const result = getRelativeWeekdayIndex(date, startWeekdayIndex);
      expect(result).toBe(5);
    });

    it('if startWeekdayIndex = 3 (Wed), it should produce 4', () => {
      const startWeekdayIndex = 3;
      const result = getRelativeWeekdayIndex(date, startWeekdayIndex);
      expect(result).toBe(4);
    });

    it('if startWeekdayIndex = 4 (Thu), it should produce 3', () => {
      const startWeekdayIndex = 4;
      const result = getRelativeWeekdayIndex(date, startWeekdayIndex);
      expect(result).toBe(3);
    });

    it('if startWeekdayIndex = 5 (Fri), it should produce 2', () => {
      const startWeekdayIndex = 5;
      const result = getRelativeWeekdayIndex(date, startWeekdayIndex);
      expect(result).toBe(2);
    });

    it('if startWeekdayIndex = 6 (Sat), it should produce 1', () => {
      const startWeekdayIndex = 6;
      const result = getRelativeWeekdayIndex(date, startWeekdayIndex);
      expect(result).toBe(1);
    });
  });
});
