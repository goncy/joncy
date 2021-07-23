import * as React from "react";

import {Job} from "./types";

export function useCategories(
  jobs: Job[],
): {
  selected: string[];
  categories: string[];
  toggle: (category: string) => void;
} {
  const [selected, setSelected] = React.useState<string[]>([]);
  const categories = React.useMemo(
    () => [...new Set<string>(jobs.reduce((tags, job) => tags.concat(job.tags), []))].sort(),
    [jobs],
  );

  function toggle(toggled: string) {
    setSelected((categories) =>
      categories.includes(toggled)
        ? categories.filter((category) => category !== toggled)
        : categories.concat(toggled),
    );
  }

  return {categories, selected, toggle};
}
