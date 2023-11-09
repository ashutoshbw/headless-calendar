import { it, expect, describe } from 'vitest';

import { Calendar } from '../index';

describe('Calendar()', () => {
  it('if startDate > endDate, it should throw error "startDate should be less than or equal to endDate"', () => {
    function resultFn() {
      new Calendar([2023, 2, 1], [2023, 1, 1]);
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
