import React from "react";
import {Stack, Text, Image, Badge, Button, LinkOverlay, LinkBox, Box} from "@chakra-ui/react";
import {StarIcon} from "@chakra-ui/icons";

import {Job} from "../types";

interface Props {
  job: Job;
}

function JobCard({job}: Props): JSX.Element {
  const [tag, ...tags] = job.tags;

  return (
    <LinkBox
      key={job.id}
      as={Box}
      backgroundColor={job.featured ? "primary.50" : "white"}
      data-testid={job.featured ? "featured-job" : "job"}
      padding={4}
      onClick={() =>
        window.gtag("event", "click", {
          value: "apply",
          company: job.company,
          position: job.position,
          title: `${job.company} - ${job.position}`,
          featured: job.featured,
          tags: job.tags,
          id: job.id,
        })
      }
    >
      <Stack>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          width="100%"
        >
          <Stack direction="row">
            {job.image && (
              <Image
                aria-label={`${job.company} logo`}
                backgroundColor="white"
                borderRadius="md"
                height={12}
                loading="lazy"
                minWidth={12}
                objectFit="contain"
                src={job.image}
                width={12}
              />
            )}
            <Stack spacing={0}>
              <Text color="gray.500" fontSize="sm">
                {job.company}
              </Text>
              <Stack alignItems="baseline" direction="row" spacing={1}>
                {job.featured && (
                  <StarIcon
                    aria-label="star icon"
                    color="yellow.500"
                    height={4}
                    role="img"
                    width={4}
                  />
                )}
                <Text fontSize="lg" fontWeight="500" lineHeight="normal">
                  {job.position}
                </Text>
              </Stack>
            </Stack>
          </Stack>
          <Badge key={tag} colorScheme="primary" fontSize={{base: 11, md: 12}}>
            {tag}
          </Badge>
        </Stack>
        {Boolean(tags.length) && (
          <Stack alignItems="center" direction="row" flexWrap="wrap" justifyContent="flex-start">
            {tags.map((tag) => (
              <Badge key={tag} colorScheme="gray" fontSize={{base: 9, md: 10}}>
                {tag}
              </Badge>
            ))}
          </Stack>
        )}
        {job.description && (
          <Text color="gray.500" fontSize="sm" marginBottom={1} name={job.position} role="article">
            {job.description}
          </Text>
        )}
        <Stack
          alignItems="flex-end"
          direction="row"
          justifyContent="space-between"
          marginTop="auto"
        >
          {(job.min || job.max) && (
            <Text color="green.500" data-testid="range" fontSize="sm" fontWeight="500">
              {job.min}
              {job.min && job.max && ` - `}
              {job.max}
            </Text>
          )}
          <LinkOverlay href={job.link} marginLeft="auto">
            <Button colorScheme="primary" size="sm" variant={job.featured ? "solid" : "ghost"}>
              Aplicar
            </Button>
          </LinkOverlay>
        </Stack>
      </Stack>
    </LinkBox>
  );
}

export default JobCard;
