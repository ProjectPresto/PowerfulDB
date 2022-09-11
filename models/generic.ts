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
}
