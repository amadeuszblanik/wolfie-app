export interface ResultsList<T> {
  count: number;
  page: {
    current: number;
    total: number;
  };
  results: T[];
}
