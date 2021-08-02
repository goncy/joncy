import axios from "axios";
import Papa from "papaparse";

import {Job} from "../types";

import {RawJob} from "./types";
import {parseJob, parseJobs} from "./utils";

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
