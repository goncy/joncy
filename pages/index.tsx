import * as React from "react";
import {GetStaticProps} from "next";

import {Job} from "../job/types";
import api from "../job/api";
import JobsScreen from "../app/screens/Index";

interface Props {
  jobs: Job[];
}

const IndexRoute: React.FC<Props> = ({jobs}) => {
  return <JobsScreen jobs={jobs} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const jobs = await api.list();

  return {
    revalidate: 10,
    props: {
      jobs,
    },
  };
};

export default IndexRoute;
