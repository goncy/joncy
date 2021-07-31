import axios from "axios";
import Papa from "papaparse";

import {Job, RawJob} from "./types";

// Utilities
export function parseJob(job: RawJob): Job {
  return {
    ...job,
    featured: Boolean(job.featured),
    createdAt: +new Date(job.createdAt),
    expiredAt: +new Date(job.expiredAt),
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

// Handlers
const api = {
  list: async (): Promise<Job[]> => {
    return axios
      .get(process.env.NEXT_PUBLIC_SHEET, {
        responseType: "blob",
      })
      .then(
        (response) =>
          new Promise((resolve, reject) => {
            Papa.parse<RawJob>(response.data, {
              header: true,
              complete: (results) => resolve(parseJobs(results.data)),
              error: (error) => reject(error.message),
            });
          }),
      );
  },
  fetch: async (id: Job["id"]): Promise<Job> => {
    const jobs: Job[] = await api.list();

    return jobs.find((job) => job.id === id);
  },
  mock: {
    list: (mock: string): Promise<Job[]> =>
      import(`./mocks/list/${mock}.json`).then((result) => parseJobs(result.default)),
    fetch: (mock: string): Promise<Job> =>
      import(`./mocks/single/${mock}.json`).then((result) => parseJob(result.default)),
  },
};

export default api;
