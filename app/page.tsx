'use client';
import IssueList from './components/IssueList';
import ReviewHeader from './components/ReviewHeader';
import SubmissionBanner from './components/SubmissionBanner';
import PDFViewerClient from './components/PDFViewerClient';
import { useCallback, useState } from 'react';
import reviewMock from './mocks/review_mock.json';
import type { Review } from './types/review';
import StatusFilters from './components/StatusFilters';

const review = reviewMock as Review;

export type Status = 'critical' | 'major' | 'minor' | 'resolved';
export type StatusFilter = 'all' | Status;

export default function Home() {
  const [selectedPage, setSelectedPage] = useState<number | null>(null);
  const [resolvedIssues, setResolvedIssues] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<StatusFilter>('all');

  const unresolvedIssues = review.issues.filter(
    (issue) => !resolvedIssues.includes(issue.id),
  );

  const unresolvedCriticalIssues = unresolvedIssues.filter(
    (issue) => issue.severity === 'critical',
  );

  const unresolvedMajorIssues = unresolvedIssues.filter(
    (issue) => issue.severity === 'major',
  );

  const unresolvedMinorIssues = unresolvedIssues.filter(
    (issue) => issue.severity === 'minor',
  );

  const resolvedIssuesList = review.issues.filter((issue) =>
    resolvedIssues.includes(issue.id),
  );

  const blockingIssues = [
    ...unresolvedCriticalIssues,
    ...unresolvedMajorIssues,
  ];
  const canSubmit = blockingIssues.length === 0;

  const filteredIssues =
    selectedFilter === 'all'
      ? unresolvedIssues
      : selectedFilter === 'critical'
        ? unresolvedCriticalIssues
        : selectedFilter === 'major'
          ? unresolvedMajorIssues
          : selectedFilter === 'minor'
            ? unresolvedMinorIssues
            : selectedFilter === 'resolved'
              ? resolvedIssuesList
              : [];

  const handleResolveIssue = useCallback((issueId: string) => {
    setResolvedIssues((prev) =>
      prev.includes(issueId) ? prev : [...prev, issueId],
    );
  }, []);

  const handleIssueClick = useCallback((page: number) => {
    setSelectedPage(page);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <main className="mx-auto max-w-5xl space-y-6">
        <StatusFilters
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />
        <SubmissionBanner />

        <ReviewHeader
          unresolvedIssues={unresolvedIssues.length}
          unresolvedCriticalIssues={unresolvedCriticalIssues.length}
          unresolvedMajorIssues={unresolvedMajorIssues.length}
          unresolvedMinorIssues={unresolvedMinorIssues.length}
          resolvedIssuesList={resolvedIssuesList.length}
        />

        {!canSubmit && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            This review cannot be submitted yet. Resolve all critical and major
            issues first.
          </div>
        )}

        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl text-black font-semibold">Issues</h2>

          <IssueList
            issues={filteredIssues}
            resolvedIssues={resolvedIssues}
            onResolveIssue={handleResolveIssue}
            onIssueClick={handleIssueClick}
          />
        </section>

        <section>
          <PDFViewerClient
            pdfUrl={review.document.pdf_url}
            selectedPage={selectedPage}
          />
        </section>

        <button
          disabled={!canSubmit}
          className="rounded-lg bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-zinc-300"
        >
          Submit review
        </button>
      </main>
    </div>
  );
}
