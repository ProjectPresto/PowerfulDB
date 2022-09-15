export interface Tokens {
  refresh: string;
  access: string;
}

export interface Pagination {
  object_count: number;
  page_count: number;
  next: string;
  previous: string;
}

export interface UrlQueries {
  page?: number;
  size?: number;
  sort?: string;
  search?: string;
  genres?: [];
}

export interface Article {
  id: number;
  article_text: string;
  source?: string;
  source_url?: string;
  created_at: string;
  created_by: number;
  updated_at: string;
  updated_by: number;
}
