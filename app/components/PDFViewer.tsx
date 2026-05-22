'use client';

import { useEffect, useRef, useState } from 'react';
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

const PDFViewer = ({ pdfUrl, selectedPage }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState(0);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [pageWidth, setPageWidth] = useState(900);

  const pageRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    const updateWidth = () => {
      setPageWidth(Math.min(window.innerWidth - 48, 900));
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleLoadSuccess = ({ numPages }: PDFDocumentProxy) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    if (!selectedPage) return;

    pageRefs.current[selectedPage]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [selectedPage]);

  return (
    <div className="h-[800px] overflow-y-auto rounded-xl border bg-zinc-100 p-4">
      <p className="mb-4 text-black">Selected page: {selectedPage}</p>
      {pdfError && (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {pdfError}
        </p>
      )}
      <Document
        file={pdfUrl}
        onLoadSuccess={handleLoadSuccess}
        onLoadError={() => setPdfError('Could not load the PDF document.')}
        loading={<p className="text-black">Loading document...</p>}
        error={
          <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            Could not load the PDF document.
          </p>
        }
      >
        <div className="flex flex-col items-center gap-6">
          {Array.from({ length: numPages }, (_, index) => {
            const pageNumber = index + 1;

            return (
              <div
                key={pageNumber}
                ref={(element) => {
                  pageRefs.current[pageNumber] = element;
                }}
              >
                <Page
                  pageNumber={pageNumber}
                  width={pageWidth}
                  className={
                    selectedPage === pageNumber ? 'ring-4 ring-blue-500' : ''
                  }
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
