import { it, expect, describe } from 'vitest';

import { Calendar } from '../index';

describe('Calendar()', () => {
  it('if startDate > endDate, it should throw error "startDate should be less than or equal to endDate"', () => {
    function resultFn() {
      new Calendar(
        { year: 2023, month: 2, day: 1 },
        { year: 2023, month: 1, day: 1 }
      );
    }

    expect(resultFn).toThrow(
      'startDate should be less than or equal to endDate'
    );
  });
});

describe('Calendar.ofLastYear()', () => {
  it('should have 365 days', () => {
    const cal = Calendar.ofLastYear();
    expect(cal.length).toBe(365);
  });
});
