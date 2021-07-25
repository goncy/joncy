import {Job, RawJob} from "./types";

export function parseJobs(jobs: RawJob[]): Job[] {
  return jobs
    .map((job) => ({
      ...job,
      featured: Boolean(job.featured),
      createdAt: +new Date(job.createdAt),
      expiredAt: +new Date(job.expiredAt),
      tags: job.tags.split(",").map((tag) => tag.toLowerCase().trim()),
      seniority: job.seniority.split(",").map((tag) => tag.toLowerCase().trim()),
    }))
    .filter((job) => job.expiredAt >= +new Date())
    .sort((a, b) => (a.featured ? -1 : b.featured ? 1 : b.createdAt - a.createdAt));
}
