import type { Issue } from '../types/review';
import IssueSummaryCards from './IssueSummaryCard';

type IssueListProps = {
  issues: Issue[];
  resolvedIssues: string[];
  onResolveIssue: (issueId: string) => void;
  onIssueClick: (page: number) => void;
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
    <ul className="mt-4 space-y-4">
      {issues.map((issue) => (
        <li
          key={issue.id}
          className="rounded-lg border p-4 hover:bg-emerald-50 border-emerald-200 cursor-pointer"
        >
          <IssueSummaryCards
            issue={issue}
            resolved={resolvedIssues.includes(issue.id)}
            onResolve={() => onResolveIssue(issue.id)}
            onIssueClick={onIssueClick}
          />
        </li>
      ))}
    </ul>
  );
};

export default IssueList;
