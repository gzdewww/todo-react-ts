import { useState } from "react";
import type { Filter } from "../types/filter";

export function useFilter<T>(filters: Filter<T>[], defaultFilter: Filter<T>) {
  const [filter, setFilter] = useState<Filter<T>>(defaultFilter);

  const setFilterByValue = (value: string) => {
    const newFilter = filters.find((filter) => filter.value === value);
    if (newFilter) setFilter(newFilter);
  };

  return [filter, setFilterByValue] as const;
}
