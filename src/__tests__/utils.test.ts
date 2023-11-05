import { it, expect, describe } from 'vitest';

import { FullDate, convertToJSDate } from '../utils';

describe('convertToJSDate()', () => {
  it('month number should start with 1', () => {
    const monthNumber = 1;
    const fullDate: FullDate = [2023, monthNumber, 1];
    const resultDate = convertToJSDate(fullDate);
    expect(resultDate.getUTCMonth()).toBe(monthNumber - 1);
  });
});
