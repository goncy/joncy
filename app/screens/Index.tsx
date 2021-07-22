import * as React from "react";
import {Stack, StackDivider, Text} from "@chakra-ui/react";

import {Job} from "../../job/types";
import JobCard from "../../job/components/JobCard";

interface Props {
  jobs: Job[];
}

const JobsScreen: React.FC<Props> = ({jobs}) => {
  if (!jobs.length) {
    return (
      <Text color="gray.500" fontSize="lg" margin="auto" paddingY={4}>
        No hay propuestas
      </Text>
    );
  }

  return (
    <Stack divider={<StackDivider />} spacing={0}>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </Stack>
  );
};

export default JobsScreen;
