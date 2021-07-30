import {ParsedUrlQuery} from "querystring";

import * as React from "react";
import {GetStaticPaths, GetStaticProps} from "next";

import {Job} from "../job/types";
import api from "../job/api";
import JobScreen from "../job/screens/Job";

interface Props {
  job: Job;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

function IdRoute({job}: Props): JSX.Element {
  return <JobScreen job={job} />;
}

export const getStaticProps: GetStaticProps<unknown, Params> = async ({params}) => {
  try {
    // Fetch the selected job
    const job = await api.fetch(params.id);

    // If job doesn't exist, throw an error
    if (!job) {
      throw new Error("No se encontró la oportunidad");
    }

    return {
      // Revalidate every 6 hours
      revalidate: 3600 * 6,
      props: {
        job,
      },
    };
  } catch (error) {
    // Handle error on error screen
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Just prefetch paths on production
  if (process.env.NODE_ENV === "production") {
    // Fetch all jobs
    const jobs = await api.list();

    return {
      // Map job id as param
      paths: jobs.map((job) => ({
        params: {id: job.id},
      })),
      // Build not relevant ones on demand
      fallback: "blocking",
    };
  }

  // Don't prefetch for non production environments
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default IdRoute;
