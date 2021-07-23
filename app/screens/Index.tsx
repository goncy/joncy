import * as React from "react";
import {Badge, Stack, StackDivider, Text, Wrap, WrapItem} from "@chakra-ui/react";

import {Job} from "../../job/types";
import JobCard from "../../job/components/JobCard";

interface Props {
  jobs: Job[];
}

const JobsScreen: React.FC<Props> = ({jobs}) => {
  const [categories, setCategories] = React.useState<string[]>([]);
  const tags = React.useMemo(
    () => [...new Set<string>(jobs.reduce((tags, job) => tags.concat(job.tags), []))].sort(),
    [jobs],
  );
  const matches = React.useMemo(
    () =>
      categories.length
        ? jobs.filter((job) => job.tags.some((category) => categories.includes(category)))
        : jobs,
    [jobs, categories],
  );

  function handleTagClick(tag: string) {
    setCategories((categories) =>
      categories.includes(tag)
        ? categories.filter((category) => category !== tag)
        : categories.concat(tag),
    );
  }

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
        {tags.map((tag) => (
          <WrapItem key={tag}>
            <Badge
              as="button"
              colorScheme="primary"
              fontSize={{base: 14, md: 12}}
              variant={categories.includes(tag) ? "solid" : "outline"}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
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
