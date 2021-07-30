import fs from "fs";

import * as React from "react";
import {GetStaticProps} from "next";

import {Job} from "../job/types";
import api from "../job/api";
import JobsScreen from "../job/screens/Jobs";
import {buildSitemap} from "../app/utils/sitemap";

interface Props {
  jobs: Job[];
}

const IndexRoute: React.FC<Props> = ({jobs}) => {
  return <JobsScreen jobs={jobs} />;
};

export const getStaticProps: GetStaticProps = async () => {
  // Get jobs list
  const jobs = await api.list();

  if (process.env.NODE_ENV === "production") {
    // Build sitemap for all the jobs only in production
    fs.writeFileSync("public/sitemap.xml", buildSitemap(jobs));
  }

  return {
    // Revalidate every 6 hours
    revalidate: 3600 * 6,
    props: {
      jobs,
    },
  };
};

export default IndexRoute;
