export interface Filter<T> {
  value: string;
  label: string;
  getFiltered: (array: T[]) => T[];
}
