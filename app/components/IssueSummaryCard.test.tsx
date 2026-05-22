import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import IssueSummaryCard from './IssueSummaryCard';

describe('IssueSummaryCard', () => {
  it('calls onResolve when button is clicked', async () => {
    const onResolve = vi.fn();

    render(
      <IssueSummaryCard
        issue={{
          id: '1',
          title: 'Test issue',
          description: 'Description',
          severity: 'critical',
          page: 1,
        }}
        resolved={false}
        onResolve={onResolve}
        onIssueClick={() => {}}
      />,
    );

    await userEvent.click(
      screen.getByRole('button', {
        name: /mark as resolved/i,
      }),
    );

    expect(onResolve).toHaveBeenCalled();
  });
});
