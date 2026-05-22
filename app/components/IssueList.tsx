import { List } from 'react-window';
import type { CSSProperties, ReactElement } from 'react';
import { useEffect, useState } from 'react';
import type { Issue } from '../types/review';
import IssueSummaryCard from './IssueSummaryCard';

type IssueListProps = {
  issues: Issue[];
  resolvedIssues: string[];
  onResolveIssue: (issueId: string) => void;
  onIssueClick: (page: number) => void;
};

type RowData = {
  issues: Issue[];
  resolvedIssues: string[];
  onResolveIssue: (issueId: string) => void;
  onIssueClick: (page: number) => void;
};

type RowProps = RowData & {
  index: number;
  style: CSSProperties;
  ariaAttributes: {
    'aria-posinset': number;
    'aria-setsize': number;
    role: 'listitem';
  };
};

const Row = ({
  index,
  style,
  ariaAttributes,
  issues,
  resolvedIssues,
  onResolveIssue,
  onIssueClick,
}: RowProps): ReactElement | null => {
  const issue = issues[index];

  if (!issue) return null;

  return (
    <div style={style} className="px-2 py-2" {...ariaAttributes}>
      <IssueSummaryCard
        issue={issue}
        resolved={resolvedIssues.includes(issue.id)}
        onResolve={() => onResolveIssue(issue.id)}
        onIssueClick={onIssueClick}
      />
    </div>
  );
};

const IssueList = ({
  issues,
  resolvedIssues,
  onResolveIssue,
  onIssueClick,
}: IssueListProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);

    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  const rowHeight = isMobile ? 300 : 190;
  const listHeight = isMobile ? 650 : 600;

  if (issues.length === 0) {
    return (
      <p className="mt-4 rounded-lg border border-dashed p-6 text-center text-zinc-500">
        No issues found for this filter.
      </p>
    );
  }

  return (
    <div className="mt-4">
      <List<RowData>
        rowComponent={Row}
        rowCount={issues.length}
        rowHeight={rowHeight}
        rowProps={{
          issues,
          resolvedIssues,
          onResolveIssue,
          onIssueClick,
        }}
        style={{ height: listHeight, width: '100%' }}
      />
    </div>
  );
};

export default IssueList;
