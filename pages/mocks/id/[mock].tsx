import {ParsedUrlQuery} from "querystring";

import * as React from "react";
import {GetStaticPaths, GetStaticProps} from "next";

import {Job} from "../../../job/types";
import api from "../../../job/api";
import JobScreen from "../../../job/screens/Job";

interface Props {
  job: Job;
}

interface Params extends ParsedUrlQuery {
  mock: string;
}

function IdRoute({job}: Props): JSX.Element {
  return <JobScreen job={job} />;
}

export const getStaticProps: GetStaticProps<unknown, Params> = async ({params}) => {
  // Don't render this page in production
  if (process.env.NEXT_PUBLIC_ENV === "production") {
    return {
      notFound: true,
    };
  }

  // Get job for selected mock
  const job = await api.mock.fetch(params.mock);

  return {
    // Revalidate every 1 second
    revalidate: 1,
    props: {
      job,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    // Only get paths for non production environments
    fallback: process.env.NEXT_PUBLIC_ENV === "production" ? false : "blocking",
  };
};

export default IdRoute;
