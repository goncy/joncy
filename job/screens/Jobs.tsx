import * as React from "react";
import {Badge, Stack, StackDivider, Text, Wrap, WrapItem} from "@chakra-ui/react";

import {Job} from "../types";
import JobCard from "../components/JobCard";
import {useTags, useSeniorities} from "../hooks";

interface Props {
  jobs: Job[];
}

const JobsScreen: React.FC<Props> = ({jobs}) => {
  const {selected: selectedTags, tags, toggle: toggleTag} = useTags(jobs);
  const {
    selected: selectedSeniorities,
    seniorities,
    toggle: toggleSeniority,
  } = useSeniorities(jobs);
  const hasSeniorities = seniorities.length > 0;
  const hasTags = tags.length > 0;
  const matches = React.useMemo(
    () =>
      jobs.filter(
        (job) =>
          // Check if there are tags selected
          (selectedTags.length
            ? // If some, check if it matches with some of the tags of this job
              job.tags.some((tag) => selectedTags.includes(tag))
            : // If none tags are selected just return true
              true) &&
          // Check if there are seniorities selected
          (selectedSeniorities.length
            ? // If some, check if it matches with some of the seniorities of this job
              job.seniority.some((seniority) => selectedSeniorities.includes(seniority))
            : // If none tags are selected just return true
              true),
      ),
    [jobs, selectedTags, selectedSeniorities],
  );

  return (
    <Stack spacing={0}>
      {(hasSeniorities || hasTags) && (
        <Stack
          borderBottomWidth={1}
          boxShadow="sm"
          layerStyle="card"
          padding={4}
          position={{base: "inherit", md: "sticky"}}
          spacing={4}
          top={0}
          zIndex={1}
        >
          {hasSeniorities && (
            <Wrap justify="center">
              {seniorities.map((tag) => (
                <WrapItem key={tag}>
                  <Badge
                    as="button"
                    colorScheme="primary"
                    fontSize={{base: 16, md: 12}}
                    variant={selectedSeniorities.includes(tag) ? "solid" : "subtle"}
                    onClick={() => toggleSeniority(tag)}
                  >
                    {tag}
                  </Badge>
                </WrapItem>
              ))}
            </Wrap>
          )}
          {hasTags && (
            <Wrap justify="center">
              {tags.map((tag) => (
                <WrapItem key={tag}>
                  <Badge
                    as="button"
                    colorScheme="secondary"
                    fontSize={{base: 16, md: 12}}
                    variant={selectedTags.includes(tag) ? "solid" : "subtle"}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                </WrapItem>
              ))}
            </Wrap>
          )}
        </Stack>
      )}
      {matches.length ? (
        <Stack divider={<StackDivider />} spacing={0}>
          {matches.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </Stack>
      ) : (
        <Text fontSize="lg" margin="auto" paddingY={4} textAlign="center" textStyle="soft">
          No hay propuestas
        </Text>
      )}
    </Stack>
  );
};

export default JobsScreen;
