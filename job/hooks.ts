import * as React from "react";

import * as analytics from "../analytics";

import {Job} from "./types";

export function useTags(
  jobs: Job[],
): {
  selected: string[];
  tags: string[];
  toggle: (tag: string) => void;
} {
  const [selected, setSelected] = React.useState<string[]>([]);
  const tags = React.useMemo(
    () => [...new Set<string>(jobs.reduce((tags, job) => tags.concat(job.tags), []))].sort(),
    [jobs],
  );

  function toggle(toggled: string) {
    analytics.track("click", {
      value: "tag",
      name: toggled,
    });

    setSelected((tags) =>
      tags.includes(toggled) ? tags.filter((tag) => tag !== toggled) : tags.concat(toggled),
    );
  }

  return {tags, selected, toggle};
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
    analytics.track("click", {
      value: "seniority",
      name: toggled,
    });

    setSelected((seniorities) =>
      seniorities.includes(toggled)
        ? seniorities.filter((seniority) => seniority !== toggled)
        : seniorities.concat(toggled),
    );
  }

  return {seniorities, selected, toggle};
}
