export type Severity = 'critical' | 'major' | 'minor';

export type ReviewStatus =
  | 'created'
  | 'processing'
  | 'on_review'
  | 'submitted';

export type Issue = {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  page: number;
};

export type Review = {
  id: string;
  name: string;
  uploaded_at: string;
  status: ReviewStatus;
  version: number;
  document: {
    pdf_url: string;
    pages: {
      page_num: number;
      height: number;
      width: number;
    }[];
  };
  user: {
    id: string;
    first_name: string;
    last_name: string;
  };
  issues: Issue[];
};