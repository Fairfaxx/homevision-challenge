import type { Issue } from '../types/review';

type Props = {
  issue: Issue;
  onIssueClick: (page: number) => void;
  resolved: boolean;
  onResolve: () => void;
};

const IssueSummaryCard = ({
  issue,
  onIssueClick,
  resolved,
  onResolve,
}: Props) => {
  return (
    <div
      className={`cursor-pointer rounded-lg p-4 transition-colors ${
        resolved
          ? 'border border-emerald-200 bg-emerald-50 opacity-70'
          : 'border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
      }`}
      onClick={() => onIssueClick(issue.page)}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <p className="font-semibold text-black">{issue.title}</p>

          <p className="mt-1 text-sm text-black">{issue.description}</p>

          <p className="mt-2 text-sm text-black">Page {issue.page}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:justify-end">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold uppercase text-white ${
              issue.severity === 'critical'
                ? 'bg-red-500'
                : issue.severity === 'major'
                  ? 'bg-orange-500'
                  : 'bg-yellow-400'
            }`}
          >
            {issue.severity}
          </span>

          <button
            className={`w-full rounded border px-3 py-2 text-sm sm:w-auto ${
              resolved
                ? 'border-emerald-500 bg-emerald-500 text-white'
                : 'border-black text-black'
            }`}
            onClick={(event) => {
              event.stopPropagation();
              onResolve();
            }}
            disabled={resolved}
          >
            {resolved ? 'Resolved' : 'Mark as resolved'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueSummaryCard;
