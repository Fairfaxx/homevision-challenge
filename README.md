# HomeVision Challenge

## Live Demo

[https://homevision-challenge-beta.vercel.app/](https://homevision-challenge-beta.vercel.app/)

This project is a document review interface built with Next.js, TypeScript, and Tailwind CSS.

## Project Overview

This application helps a reviewer inspect a PDF report, track detected issues, and complete a review only when blocking items are resolved.

Purpose:
- provide a fast review workflow that links issue cards directly to document pages;
- reduce submission mistakes by enforcing resolution of critical and major issues;
- make review status visible through filters, counters, and clear resolved/open states.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- react-pdf
- react-window
- Vitest + Testing Library

## Requirements Matrix

| Requirement | Status | Where to verify |
| --- | --- | --- |
| Review issues from a PDF | Done | Main page issue list + PDF viewer |
| Navigate to issue page on click | Done | Click any issue card and observe PDF scroll |
| Resolve issues | Done | `Mark as resolved` button on issue cards |
| Filter by severity/status | Done | Top filter bar (`All`, `Critical`, `Major`, `Minor`, `Resolved`) |
| Block submission for unresolved major/critical issues | Done | Submit button + red blocking banner |
| Responsive behavior | Done | Mobile layout in issue list and PDF width handling |

## Technical Decisions and Trade-offs

- **App Router + TypeScript:** keeps routing modern and enables stronger type guarantees over review data.
- **Client-only PDF rendering (`react-pdf`):** avoids SSR/runtime issues for browser-only APIs, with the trade-off of client-side hydration before viewer interactivity.
- **Lifted state in `app/page.tsx`:** simplifies synchronization between filters, resolve state, counters, and selected page.
- **Derived state for counters and filtered lists:** avoids duplicated state and desynchronization bugs.
- **`react-window` for issue list virtualization:** improves list rendering scalability with the trade-off of fixed row-height tuning.
- **Memoized PDF page items:** reduces unnecessary rerenders when selection changes.

## Error Handling and Edge Cases

Current behavior includes:

- PDF load failures (`onLoadError`) show a visible error message.
- Invalid/unavailable source (`onSourceError`) shows a dedicated fallback message.
- Out-of-range page selection is ignored safely.
- Empty filter results show an explicit empty-state message.
- Resolving an already-resolved issue is idempotent.

Verification steps for error handling:

1. Temporarily set the PDF URL to an invalid path in `app/mocks/review_mock.json`.
2. Run `npm run dev` and open the app.
3. Confirm the viewer shows a clear fallback error message (load/source failure) instead of crashing.
4. Restore the original PDF URL and verify normal rendering is recovered.

## Run From Scratch

### Prerequisites

- Node.js `>= 22.12.0`
- npm `>= 10`

### Installation

```bash
npm ci
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Lint

```bash
npm run lint
```

### Tests

```bash
npm run test
```

### Production build check

```bash
npm run build
```

## Quick QA Script (Manual Verification)

1. Open the app and confirm issues are listed.
2. Click one issue and confirm the PDF scrolls to the referenced page.
3. Click `Mark as resolved` on one issue and confirm visual resolved state.
4. Switch filters (`Critical`, `Major`, `Resolved`) and confirm list updates correctly.
5. Confirm submit is blocked while unresolved `critical`/`major` issues remain.
6. Resolve all `critical`/`major` issues and confirm submit becomes enabled.

## Tests Included

- `app/components/IssueSummaryCard.test.tsx`
  - verifies that clicking `Mark as resolved` triggers the expected callback.

## Project Structure

```text
app/
  components/
    IssueList.tsx
    IssueSummaryCard.tsx
    PDFViewer.tsx
    PDFViewerClient.tsx
    ReviewHeader.tsx
    StatusFilters.tsx
    SubmissionBanner.tsx
  mocks/
    review_mock.json
  types/
    review.ts
```

## Notes

Main challenge addressed: integrating `react-pdf` with App Router while keeping a stable client-side rendering flow.
