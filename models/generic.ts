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
  ordering?: string;
  search?: string;
  genres?: [];
  artist?: number;
  band?: number;
  id__in?: string;
  release_date__day?: number;
  release_date__month?: number;
  birth_date__day?: number;
  birth_date__month?: number;
  death_date__day?: number;
  death_date__month?: number;
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
