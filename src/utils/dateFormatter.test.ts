import { describe, it, expect } from 'bun:test';
import { formatDate } from './dateFormatter';

describe('formatDate', () => {
  it('formats ISO date string to readable format', () => {
    expect(formatDate('2026-03-19T12:00:00Z')).toBe('March 19, 2026');
  });

  it('handles date without time component', () => {
    expect(formatDate('2026-01-15')).toBe('January 15, 2026');
  });

  it('returns empty string for empty input', () => {
    expect(formatDate('')).toBe('');
  });
});
