import * as React from "react";
import {Badge, Stack, StackDivider, Text, Wrap, WrapItem} from "@chakra-ui/react";

import {Job} from "../../job/types";
import JobCard from "../../job/components/JobCard";
import {useTags, useSeniorities} from "../../job/hooks";

interface Props {
  jobs: Job[];
}

const JobsScreen: React.FC<Props> = ({jobs}) => {
  const {selected: selectedTags, tags, toggle: toggleTag} = useTags(jobs);
  const {selected: selectedSeniorities, seniorities, toggle: toggleSeniority} = useSeniorities(
    jobs,
  );
  const matches = React.useMemo(
    () =>
      jobs.filter(
        (job) =>
          (selectedTags.length ? job.tags.some((tag) => selectedTags.includes(tag)) : true) &&
          (selectedSeniorities.length
            ? job.seniority.some((seniority) => selectedSeniorities.includes(seniority))
            : true),
      ),
    [jobs, selectedTags, selectedSeniorities],
  );

  return (
    <Stack divider={<StackDivider />} spacing={0}>
      <Stack padding={4} spacing={4}>
        <Wrap justify="center">
          {seniorities.map((tag) => (
            <WrapItem key={tag}>
              <Badge
                as="button"
                colorScheme="primary"
                fontSize={{base: 14, md: 12}}
                variant={selectedSeniorities.includes(tag) ? "subtle" : "outline"}
                onClick={() => toggleSeniority(tag)}
              >
                {tag}
              </Badge>
            </WrapItem>
          ))}
        </Wrap>
        <Wrap justify="center">
          {tags.map((tag) => (
            <WrapItem key={tag}>
              <Badge
                as="button"
                colorScheme="green"
                fontSize={{base: 14, md: 12}}
                variant={selectedTags.includes(tag) ? "subtle" : "outline"}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            </WrapItem>
          ))}
        </Wrap>
      </Stack>
      {matches.length ? (
        <Stack divider={<StackDivider />} spacing={0}>
          {matches.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </Stack>
      ) : (
        <Text color="gray.500" fontSize="lg" margin="auto" paddingY={4}>
          No hay propuestas
        </Text>
      )}
    </Stack>
  );
};

export default JobsScreen;
