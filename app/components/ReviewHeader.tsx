type Props = {
  unresolvedIssues: number;
  unresolvedCriticalIssues: number;
  unresolvedMajorIssues: number;
  unresolvedMinorIssues: number;
  resolvedIssuesList: number;
};

const ReviewHeader = ({
  unresolvedIssues,
  unresolvedCriticalIssues,
  unresolvedMajorIssues,
  unresolvedMinorIssues,
  resolvedIssuesList,
}: Props) => {
  return (
    <section className="grid gap-4 sm:grid-cols-5">
      <div className="rounded-xl border bg-white p-4">
        <p className="text-sm text-black">Open issues</p>
        <p className="text-2xl text-black font-bold">{unresolvedIssues}</p>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <p className="text-sm text-black">Resolved</p>
        <p className="text-2xl text-black font-bold">
          {resolvedIssuesList} of 25
        </p>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <p className="text-sm text-black">Critical</p>
        <p className="text-2xl font-bold text-red-600">
          {unresolvedCriticalIssues}
        </p>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <p className="text-sm text-black">Major</p>
        <p className="text-2xl font-bold text-orange-500">
          {unresolvedMajorIssues}
        </p>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <p className="text-sm text-black">Minor</p>
        <p className="text-2xl font-bold text-yellow-400">
          {unresolvedMinorIssues}
        </p>
      </div>
    </section>
  );
};

export default ReviewHeader;
