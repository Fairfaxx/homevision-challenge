'use client';

import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

type PDFViewerProps = {
  pdfUrl: string;
  selectedPage?: number | null;
};

type PDFPageItemProps = {
  pageNumber: number;
  width: number;
  isSelected: boolean;
};

const PDFPageItem = memo(function PDFPageItem({
  pageNumber,
  width,
  isSelected,
}: PDFPageItemProps) {
  return (
    <Page
      pageNumber={pageNumber}
      width={width}
      className={isSelected ? 'ring-4 ring-blue-500' : ''}
    />
  );
});

const PDFViewer = ({ pdfUrl, selectedPage }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState(0);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [pageWidth, setPageWidth] = useState(900);

  const widthRafRef = useRef<number | null>(null);
  const pageRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    const updateWidth = () => {
      const nextWidth = Math.max(Math.min(window.innerWidth - 48, 900), 280);

      setPageWidth((currentWidth) =>
        currentWidth === nextWidth ? currentWidth : nextWidth,
      );
    };

    const handleResize = () => {
      if (widthRafRef.current !== null) {
        cancelAnimationFrame(widthRafRef.current);
      }

      widthRafRef.current = requestAnimationFrame(updateWidth);
    };

    updateWidth();
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);

      if (widthRafRef.current !== null) {
        cancelAnimationFrame(widthRafRef.current);
      }
    };
  }, []);

  const handleLoadSuccess = ({ numPages }: PDFDocumentProxy) => {
    setNumPages(numPages);
    setPdfError(null);
  };

  useEffect(() => {
    if (!selectedPage) return;
    if (selectedPage < 1 || selectedPage > numPages) return;

    pageRefs.current[selectedPage]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [numPages, selectedPage]);

  const pageNumbers = useMemo(
    () => Array.from({ length: numPages }, (_, index) => index + 1),
    [numPages],
  );

  const selectedPageLabel =
    selectedPage && selectedPage >= 1 && selectedPage <= numPages
      ? selectedPage
      : 'None';

  return (
    <div className="h-[800px] overflow-y-auto rounded-xl border bg-zinc-100 p-4">
      <p className="mb-4 text-black">Selected page: {selectedPageLabel}</p>
      {pdfError && (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {pdfError}
        </p>
      )}
      <Document
        key={pdfUrl}
        file={pdfUrl}
        onLoadSuccess={handleLoadSuccess}
        onLoadError={() =>
          setPdfError('Could not load the PDF document. Please try again.')
        }
        onSourceError={() =>
          setPdfError(
            'The document source is unavailable. Verify the URL and try again.',
          )
        }
        loading={<p className="text-black">Loading document...</p>}
        error={
          <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            Could not load the PDF document. Please try again.
          </p>
        }
      >
        <div className="flex flex-col items-center gap-6">
          {pageNumbers.map((pageNumber) => {
            return (
              <div
                key={pageNumber}
                ref={(element) => {
                  pageRefs.current[pageNumber] = element;
                }}
              >
                <PDFPageItem
                  pageNumber={pageNumber}
                  width={pageWidth}
                  isSelected={selectedPage === pageNumber}
                />
              </div>
            );
          })}
        </div>
      </Document>
    </div>
  );
};

export default PDFViewer;
