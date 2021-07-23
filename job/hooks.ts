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

export function useSeniorities(
  jobs: Job[],
): {
  selected: string[];
  seniorities: string[];
  toggle: (seniority: string) => void;
} {
  const [selected, setSelected] = React.useState<string[]>([]);
  const seniorities = React.useMemo(
    () =>
      [
        ...new Set<string>(jobs.reduce((seniority, job) => seniority.concat(job.seniority), [])),
      ].sort(),
    [jobs],
  );

  function toggle(toggled: string) {
    setSelected((seniorities) =>
      seniorities.includes(toggled)
        ? seniorities.filter((seniority) => seniority !== toggled)
        : seniorities.concat(toggled),
    );
  }

  return {seniorities, selected, toggle};
}
