import {Job} from "../types";

import {RawJob} from "./types";

export function parseJob(job: RawJob): Job {
  return {
    ...job,
    featured: Boolean(job.featured),
    createdAt: job.createdAt ? +new Date(job.createdAt) : -Infinity,
    expiredAt: job.expiredAt ? +new Date(job.expiredAt) : Infinity,
    tags: job.tags
      .split(",")
      .map((tag) => tag.toLowerCase().trim())
      .filter(Boolean),
    seniority: job.seniority
      .split(",")
      .map((tag) => tag.toLowerCase().trim())
      .filter(Boolean),
  };
}

export function parseJobs(jobs: RawJob[]): Job[] {
  return jobs
    .map(parseJob)
    .filter((job) => job.expiredAt >= +new Date() && job.createdAt <= +new Date())
    .sort((a: Job, b: Job) => (a.featured ? -1 : b.featured ? 1 : b.createdAt - a.createdAt));
}
