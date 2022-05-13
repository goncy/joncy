import type {Job} from "../types";

import {Stack, StackDivider} from "@chakra-ui/react";

import JobCard from "../components/JobCard";
import Link from "../../ui/controls/Link";

interface Props {
  job: Job;
}

const JobScreen: React.FC<Props> = ({job}) => {
  return (
    <Stack divider={<StackDivider />} spacing={0}>
      <JobCard key={job.id} job={job} />
      <Link href="/" padding={4} role="button" textAlign="center" textStyle="link">
        Ver todas las propuestas
      </Link>
    </Stack>
  );
};

export default JobScreen;
