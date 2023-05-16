export interface ResultsListApi<T> {
  count: number;
  page: {
    current: number;
    total: number;
  };
  results: T[];
}
