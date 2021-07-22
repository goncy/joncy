import {ParsedUrlQuery} from "querystring";

import * as React from "react";
import {GetStaticPaths, GetStaticProps} from "next";

import {Job} from "../../../job/types";
import api from "../../../job/api";
import JobsScreen from "../../../app/screens/Index";

interface Props {
  jobs: Job[];
}

interface Params extends ParsedUrlQuery {
  mock: string;
}

const IndexRoute: React.FC<Props> = ({jobs}) => {
  return <JobsScreen jobs={jobs} />;
};

export const getStaticProps: GetStaticProps<unknown, Params> = async ({params}) => {
  const jobs = await api.mock.list(params.mock);

  return {
    revalidate: 10,
    props: {
      jobs,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: process.env.NODE_ENV === "production" ? false : "blocking",
  };
};

export default IndexRoute;
