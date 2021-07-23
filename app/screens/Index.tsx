import * as React from "react";
import {Badge, Stack, StackDivider, Text, Wrap, WrapItem} from "@chakra-ui/react";

import {Job} from "../../job/types";
import JobCard from "../../job/components/JobCard";
import {useCategories} from "../../job/hooks";

interface Props {
  jobs: Job[];
}

const JobsScreen: React.FC<Props> = ({jobs}) => {
  const {selected, categories, toggle} = useCategories(jobs);
  const matches = React.useMemo(
    () =>
      selected.length
        ? jobs.filter((job) => job.tags.some((category) => selected.includes(category)))
        : jobs,
    [jobs, selected],
  );

  if (!matches.length) {
    return (
      <Text color="gray.500" fontSize="lg" margin="auto" paddingY={4}>
        No hay propuestas
      </Text>
    );
  }

  return (
    <Stack divider={<StackDivider />} spacing={0}>
      <Wrap justify="center" padding={4}>
        {categories.map((category) => (
          <WrapItem key={category}>
            <Badge
              as="button"
              colorScheme="primary"
              fontSize={{base: 14, md: 12}}
              variant={selected.includes(category) ? "solid" : "outline"}
              onClick={() => toggle(category)}
            >
              {category}
            </Badge>
          </WrapItem>
        ))}
      </Wrap>
      <Stack divider={<StackDivider />} spacing={0}>
        {matches.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </Stack>
    </Stack>
  );
};

export default JobsScreen;
