import axios from "axios";
import Papa from "papaparse";

import {Job} from "../types";

import {RawJob} from "./types";
import {parseJob, parseJobs} from "./utils";

const production = {
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
    const jobs: Job[] = await production.list();

    return jobs.find((job) => job.id === id);
  },
};

const development = {
  list: (): Promise<Job[]> =>
    import(`./mocks/list/default.json`).then((result) => parseJobs(result.default as RawJob[])),
  fetch: (): Promise<Job> =>
    import(`./mocks/fetch/default.json`).then((result) => parseJob(result.default)),
};

export default new Proxy<typeof production>(
  {
    production,
    development,
  } as unknown as typeof production,
  {
    get: (target, name) => target[process.env.NEXT_PUBLIC_ENV][name] || production[name],
  },
);
