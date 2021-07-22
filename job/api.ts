import axios from "axios";
import Papa from "papaparse";

import {Job, RawJob} from "./types";
import {parseJobs} from "./utils";

export default {
  list: async (): Promise<Job[]> => {
    return axios
      .get(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vT54anQqSMCQJqLvutODIsR4MqLyfAbqxzXiCdPTRESL34lAwhNLUo59-xrXXCr1SGg11VMcypOkBsk/pub?output=csv",
        {
          responseType: "blob",
        },
      )
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
  mock: {
    list: (mock: string): Promise<Job[]> =>
      import(`./mocks/${mock}.json`).then((result) => parseJobs(result.default)),
  },
};
