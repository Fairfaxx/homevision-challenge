import { List } from 'react-window';
import type { CSSProperties } from 'react';
import type { Issue } from '../types/review';
import IssueSummaryCard from './IssueSummaryCard';

type IssueListProps = {
  issues: Issue[];
  resolvedIssues: string[];
  onResolveIssue: (issueId: string) => void;
  onIssueClick: (page: number) => void;
};

type RowProps = {
  index: number;
  style: CSSProperties;
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

const Row = ({
  index,
  style,
  issues,
  resolvedIssues,
  onResolveIssue,
  onIssueClick,
}: RowProps) => {
  const issue = issues[index];

  return (
    <div style={style} className="pr-2 pb-4">
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
        rowHeight={190}
        rowProps={{
          issues,
          resolvedIssues,
          onResolveIssue,
          onIssueClick,
        }}
        style={{ height: 600, width: '100%' }}
      />
    </div>
  );
};

export default IssueList;
