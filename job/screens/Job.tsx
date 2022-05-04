import NextLink from "next/link";
import {Stack, Link, StackDivider} from "@chakra-ui/react";

import {Job} from "../types";
import JobCard from "../components/JobCard";

interface Props {
  job: Job;
}

const JobScreen: React.FC<Props> = ({job}) => {
  return (
    <Stack divider={<StackDivider />} spacing={0}>
      <JobCard key={job.id} job={job} />
      <NextLink href="/">
        <Link padding={4} role="button" textAlign="center" textStyle="link">
          Ver todas las propuestas
        </Link>
      </NextLink>
    </Stack>
  );
};

export default JobScreen;
