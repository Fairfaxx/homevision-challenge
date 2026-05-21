'use client';

import dynamic from 'next/dynamic';

const PDFViewer = dynamic(() => import('./PDFViewer'), {
  ssr: false,
  loading: () => <p className="text-black">Loading PDF...</p>,
});

type PDFViewerClientProps = {
  pdfUrl: string;
  selectedPage?: number | null;
};

const PDFViewerClient = ({ pdfUrl, selectedPage }: PDFViewerClientProps) => {
  return <PDFViewer pdfUrl={pdfUrl} selectedPage={selectedPage} />;
};

export default PDFViewerClient;
