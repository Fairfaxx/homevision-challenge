HomeVision Challenge

## Live Demo

https://homevision-challenge-beta.vercel.app/

This project is a document review interface built with Next.js, TypeScript and Tailwind CSS.

The goal of the challenge was to create a simple review workflow where users can:

- Review issues found in a PDF document
- Navigate between issues and PDF pages
- Resolve issues
- Filter issues by severity
- Block submission until all important issues are resolved

## Tech Stack:

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- react-pdf

## Features Implemented
PDF Viewer:
- Multi-page PDF rendering using react-pdf
- Smooth scrolling inside the document
- Selected page highlight
- Responsive PDF viewer for mobile screens

## Technical Decisions

I used Next.js with TypeScript because the challenge is focused on a real frontend workflow and type safety helps avoid mistakes with the review data.

I used react-pdf to render the uploaded PDF inside the app. Since PDF rendering depends on browser APIs, I wrapped the PDF viewer in a client component and loaded it dynamically to avoid SSR issues.

The main review state lives in the Home page because different components need access to the same information: selected page, resolved issues, filters, and submit state.

Counters and filtered issues are derived from the review data and resolved issues state. I did this to avoid duplicated state.


## Issue Management:
- Display list of issues with severity levels
- Resolve issues directly from the UI
- Dynamic counters for open/resolved issues
- Submit button disabled until all critical and major issues are resolved

## Filtering
Filter issues by:
- All
- Critical
- Major
- Minor
- Resolved

## Performance
- Virtualized issue list using `react-window`


## Navigation:
- Clicking an issue scrolls the PDF viewer to the related page

## UI / UX:
- Sticky filter navbar
- Hover states for buttons and cards
- Empty state when no issues exist for a filter
- Responsive layout for mobile devices

## Project Structure
app/
  components/
    IssueList.tsx
    IssueSummaryCards.tsx
    PDFViewer.tsx
    PDFViewerClient.tsx
    ReviewHeader.tsx
    StatusFilters.tsx
    SubmissionBanner.tsx

  mocks/
    review_mock.json

  types/
    review.ts
    
## Running the Project

Install dependencies: npm install

Start development server: npm run dev

Open: http://localhost:3000

## Main Decisions
I used lifted state in the Home component to manage:
  -selected page
  -resolved issues
  -filters
  
- I separated components to keep the project easier to maintain and scale.
- I used derived state for filtered issues and counters instead of storing duplicated state.

## Possible Future Improvements
- Persist resolved issues in local storage or backend
- Add PDF search
- Add annotations/highlights inside the PDF
- Add virtualization for large issue lists

## Notes

One of the biggest challenges was integrating react-pdf with Next.js App Router because of SSR/client rendering issues.
I solved it using a client wrapper component with dynamic import and ssr: false.