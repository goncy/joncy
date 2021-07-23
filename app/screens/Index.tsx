import * as React from "react";
import {Badge, Stack, StackDivider, Text, Wrap, WrapItem} from "@chakra-ui/react";

import {Job} from "../../job/types";
import JobCard from "../../job/components/JobCard";
import {useCategories, useSeniorities} from "../../job/hooks";

interface Props {
  jobs: Job[];
}

const JobsScreen: React.FC<Props> = ({jobs}) => {
  const {selected: selectedCategories, categories, toggle: toggleCategory} = useCategories(jobs);
  const {selected: selectedSeniorities, seniorities, toggle: toggleSeniority} = useSeniorities(
    jobs,
  );
  const matches = React.useMemo(
    () =>
      jobs.filter(
        (job) =>
          (selectedCategories.length
            ? job.tags.some((category) => selectedCategories.includes(category))
            : true) &&
          (selectedSeniorities.length
            ? job.seniority.some((seniority) => selectedSeniorities.includes(seniority))
            : true),
      ),
    [jobs, selectedCategories, selectedSeniorities],
  );

  return (
    <Stack divider={<StackDivider />} spacing={0}>
      <Stack padding={4} spacing={4}>
        <Wrap justify="center">
          {seniorities.map((category) => (
            <WrapItem key={category}>
              <Badge
                as="button"
                colorScheme="primary"
                fontSize={{base: 14, md: 12}}
                variant={selectedSeniorities.includes(category) ? "subtle" : "outline"}
                onClick={() => toggleSeniority(category)}
              >
                {category}
              </Badge>
            </WrapItem>
          ))}
        </Wrap>
        <Wrap justify="center">
          {categories.map((category) => (
            <WrapItem key={category}>
              <Badge
                as="button"
                colorScheme="green"
                fontSize={{base: 14, md: 12}}
                variant={selectedCategories.includes(category) ? "subtle" : "outline"}
                onClick={() => toggleCategory(category)}
              >
                {category}
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
