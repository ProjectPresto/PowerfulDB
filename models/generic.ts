export interface Tokens {
  refresh: string;
  access: string;
}

export interface Pagination {
  count: number;
  next: string;
  previous: string;
}

export interface GenericResponse {
  count: number;
  next: string;
  previous: string;
}
